import { Button, notification } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import AntDesign from 'components/icon/AntDesign';
import Plus from 'components/icon/Plus';
import ReactOfficial from 'components/icon/ReactOfficial';
import Head from 'components/structural/Head';
import Header from 'components/structural/Header';
import Page from 'components/structural/Page';
import ContactUsForm from 'components/ui/ContactUsForm';
import EarlyAccessButton from 'components/ui/EarlyAccessButton';
import Recaptcha from 'components/ui/Recaptcha';

import { ContactUs } from 'models/ContactUs';
import { EarlyAccess } from 'models/EarlyAccess';

import { ContactUsStore } from 'store/ContactUsStore';
import { EarlyAccessStore } from 'store/EarlyAccessStore';

import Logger from 'logger';

import {
	CONTACT_US_API_ERROR_MESSAGE,
	CONTACT_US_API_ERROR_TITLE,
	CONTACT_US_SUBMITTED_MESSAGE,
	CONTACT_US_SUBMITTED_TITLE,
	CONTACT_US_SUCCESS_MESSAGE,
	CONTACT_US_SUCCESS_TITLE,
	EARLY_ACCESS_API_ERROR_MESSAGE,
	EARLY_ACCESS_API_ERROR_TITLE,
	EARLY_ACCESS_ERROR_MESSAGE,
	EARLY_ACCESS_ERROR_TITLE,
	EARLY_ACCESS_SUBMITTED_MESSAGE,
	EARLY_ACCESS_SUBMITTED_TITLE,
	EARLY_ACCESS_SUCCESS_MESSAGE,
	EARLY_ACCESS_SUCCESS_TITLE
} from 'utils/Constants';

import './style.less';

export interface LandingProps {
	contactUsStore?: ContactUsStore;
	earlyAccessStore?: EarlyAccessStore;
}

interface State {
	contactUs?: ContactUs;
	earlyAccess?: EarlyAccess;
}

@inject('contactUsStore', 'earlyAccessStore')
@observer
class Landing extends React.Component<LandingProps, State> {
	private contactFormSubmitted: boolean = false;
	private earlyAccessSubmitted: boolean = false;

	private notificationType: 'success' | 'info' | 'error' | undefined;
	private notificationTitle: string | undefined;
	private notificationMessage: string | undefined;

	private invisibleCaptcha?: any;
	private contactUsRef?: any;

	public state: State = {
		contactUs: undefined,
		earlyAccess: undefined
	};

	public componentDidUpdate() {
		if (
			(this.props.contactUsStore && !this.props.contactUsStore.loading) ||
			(this.props.earlyAccessStore && !this.props.earlyAccessStore.loading)
		) {
			if (this.notificationTitle && this.notificationMessage) {
				if (this.notificationType === 'success') {
					notification.success({
						message: this.notificationTitle,
						description: this.notificationMessage
					});
				} else if (this.notificationType === 'info') {
					notification.info({
						message: this.notificationTitle,
						description: this.notificationMessage
					});
				} else {
					notification.error({
						message: this.notificationTitle,
						description: this.notificationMessage
					});
				}
				this.notificationType = undefined;
				this.notificationTitle = undefined;
				this.notificationMessage = undefined;
			}
		}
	}

	public componentWillUnmount() {
		this.invisibleCaptcha = undefined;
		this.contactUsRef = undefined;
	}

	public handleSubmitEarlyAccess = (earlyAccess: EarlyAccess) => {
		if (this.props.earlyAccessStore) {
			this.props.earlyAccessStore.earlyAccessRequest(earlyAccess);
			this.earlyAccessSubmitted = true;
		}
	};

	public handleEarlyAccessValidationError = (error: any) => {
		// Assign the default message
		let message = EARLY_ACCESS_ERROR_MESSAGE;
		// Try to obtain a more detailed message from the control
		if (error && error.email && error.email.errors && error.email.errors.length > 0) {
			message = error.email.errors[0].message;
		}
		notification.error({
			message: EARLY_ACCESS_ERROR_TITLE,
			description: message
		});
	};

	private evaluateEarlyAccessSubmission = (data?: EarlyAccess, errors?: any) => {
		// Check the results of the sign up request
		if (data && data.id) {
			// Successful sign up
			this.notificationType = 'success';
			this.notificationTitle = EARLY_ACCESS_SUCCESS_TITLE;
			this.notificationMessage = EARLY_ACCESS_SUCCESS_MESSAGE;
		} else if (errors) {
			// Assign the title and default message
			this.notificationType = 'error';
			this.notificationTitle = EARLY_ACCESS_API_ERROR_TITLE;
			this.notificationMessage = EARLY_ACCESS_API_ERROR_MESSAGE;
			// Try to obtain a more detailed message from the request
			if (errors && errors.message) {
				this.notificationMessage = errors.message;
			}
		}
		this.earlyAccessSubmitted = false;
	};

	private onRenderedInvisibleRecaptcha = (instance: any) => {
		this.invisibleCaptcha = instance;
	};

	private executeInvisibleRecaptcha = (earlyAccess: EarlyAccess) => {
		if (this.invisibleCaptcha) {
			this.notificationType = 'info';
			this.notificationTitle = EARLY_ACCESS_SUBMITTED_TITLE;
			this.notificationMessage = EARLY_ACCESS_SUBMITTED_MESSAGE;

			this.invisibleCaptcha.reset();
			this.invisibleCaptcha.execute();
			this.setState({ earlyAccess });
		}
	};

	private onExpiredInvisibleRecaptcha = () => {
		if (this.invisibleCaptcha) {
			this.invisibleCaptcha.reset();
		}
	};

	private onVerifyInvisibleRecaptcha = (token: string) => {
		if (this.state && this.state.earlyAccess) {
			Logger.log('Token', token);
			this.handleSubmitEarlyAccess({
				emailAddress: this.state.earlyAccess.emailAddress,
				captcha: token
			});
		}
	};

	private handleSubmitContactForm = (contactUs: ContactUs) => {
		if (this.props.contactUsStore) {
			this.props.contactUsStore.contactUsRequest(contactUs);
			this.contactFormSubmitted = true;
		}
	};

	private evaluateContactFormSubmission = (data?: ContactUs, errors?: any) => {
		// Check the results of the contact form request
		if (data && data.id) {
			// Successful contact form submission
			this.notificationType = 'success';
			this.notificationTitle = CONTACT_US_SUCCESS_TITLE;
			this.notificationMessage = CONTACT_US_SUCCESS_MESSAGE;
			if (this.contactUsRef) {
				this.contactUsRef.resetFields();
			}
		} else if (errors) {
			// Assign the title and default message
			this.notificationType = 'error';
			this.notificationTitle = CONTACT_US_API_ERROR_TITLE;
			this.notificationMessage = CONTACT_US_API_ERROR_MESSAGE;
			// Try to obtain a more detailed message from the request
			if (errors && errors.message) {
				this.notificationMessage = errors.message;
			}
		}
		this.contactFormSubmitted = false;
	};

	private handleContactFormFieldsValidated = (contactUs: ContactUs, captchaToken?: string) => {
		if (captchaToken) {
			this.notificationType = 'info';
			this.notificationTitle = CONTACT_US_SUBMITTED_TITLE;
			this.notificationMessage = CONTACT_US_SUBMITTED_MESSAGE;
			contactUs.captcha = captchaToken;
			this.handleSubmitContactForm(contactUs);
		} else {
			this.setState({ contactUs });
		}
	};

	private handleContactFormVerifyRecaptcha = (captchaToken: string) => {
		if (this.state && this.state.contactUs) {
			this.handleSubmitContactForm({
				firstName: this.state.contactUs.firstName,
				lastName: this.state.contactUs.lastName,
				emailAddress: this.state.contactUs.emailAddress,
				message: this.state.contactUs.message,
				captcha: captchaToken
			});
		}
	};

	public render() {
		if (this.props.contactUsStore) {
			const { data, errors, loading } = this.props.contactUsStore;
			if (!loading && this.contactFormSubmitted) {
				this.evaluateContactFormSubmission(data, errors);
			}
		}

		if (this.props.earlyAccessStore) {
			const { data, errors, loading } = this.props.earlyAccessStore;
			if (!loading && this.earlyAccessSubmitted) {
				this.evaluateEarlyAccessSubmission(data, errors);
			}
		}

		return (
			<Page>
				<Head>
					<title>Home</title>
					<meta name="Description" content="Home" />
				</Head>
				<Header />
				<section className="Landing__Main">
					<Recaptcha
						id={'invisible-captcha-landing'}
						size={'invisible'}
						theme={'light'}
						render={'automatic'}
						renderedRecaptcha={this.onRenderedInvisibleRecaptcha}
						verifyRecaptcha={this.onVerifyInvisibleRecaptcha}
						expiredRecaptcha={this.onExpiredInvisibleRecaptcha}
					/>
					<section className="Top__Layout">
						<section className="Text__Wrapper">
							<h1>React Starter</h1>
							<p>
								<span>
									A starter project to kick start your next web app, built using React, Ant Design,
									FuseBox, and MobX
								</span>
							</p>
							<section className="Text__Wrapper__Buttons">
								<Button className="Button" type="primary">
									Ant Design
								</Button>
								<Button className="Button" type="primary">
									React
								</Button>
							</section>
						</section>
						<section className="Image__Wrapper HiddenAtMd">
							<ReactOfficial />
							<span className="Landing__Plus">
								<Plus />
							</span>
							<AntDesign />
						</section>
					</section>
					<div className="EarlyAccess__Layout">
						<section className="Text__Wrapper">
							<h1>Be The First</h1>
							<p>
								<span>
									Sign up with your email address to get priority access as soon as we launch!
								</span>
							</p>
						</section>
						<EarlyAccessButton
							handleEarlyAccessClick={this.executeInvisibleRecaptcha}
							handleEarlyAccessValidationError={this.handleEarlyAccessValidationError}
						/>
					</div>
					<section className="Why__Layout">
						<section className="Text__Wrapper">
							<h1>Why React</h1>
							<p>
								<span>
									React makes it painless to create interactive UIs. Design simple views for each
									state in your application, and React will efficiently update and render just the
									right components when your data changes.
								</span>
							</p>
							<section className="Text__Wrapper__Buttons">
								<Button className="Button" type="ghost">
									Learn More
								</Button>
							</section>
						</section>
						<section className="Image__Wrapper">
							<ReactOfficial />
						</section>
					</section>
					<section className="Why__Layout">
						<section className="Image__Wrapper HiddenAtMd">
							<AntDesign />
						</section>
						<section className="Text__Wrapper Text__Wrapper__Alt">
							<h1>Why Ant Design</h1>
							<p>
								<span>
									A design system with values of Nature and Determinacy for better user experience
									of enterprise applications. Provides a React UI library that contains a set of
									high quality components and demos for building rich, interactive user interfaces.
								</span>
							</p>
							<section className="Text__Wrapper__Buttons">
								<Button className="Button" type="ghost">
									Learn More
								</Button>
							</section>
						</section>
						<section className="Image__Wrapper ShowFlexAtMd" style={{ display: 'none' }}>
							<AntDesign />
						</section>
					</section>
					<div className="ContactUs__Layout">
						<section className="Text__Wrapper">
							<h1>Get In Touch</h1>
							<p>
								<span>Have a question? Submit the form below to leave us a message!</span>
							</p>
							<ContactUsForm
								ref={(instance: any) => (this.contactUsRef = instance)}
								handleContactFormFieldsValidated={this.handleContactFormFieldsValidated}
								handleContactFormVerifyRecaptcha={this.handleContactFormVerifyRecaptcha}
							/>
						</section>
					</div>
				</section>
			</Page>
		);
	}
}

export default Landing;
