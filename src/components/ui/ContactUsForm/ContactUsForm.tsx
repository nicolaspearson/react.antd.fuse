import { Col, Form, Input, notification, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import * as Reaptcha from 'reaptcha';

import RoundButton from 'components/ui/RoundButton';

import { ContactUs } from 'models/ContactUs';

import { ContactUsStore } from 'store/ContactUsStore';

import { CONTACT_US_CAPTCHA_ERROR_MESSAGE, CONTACT_US_CAPTCHA_ERROR_TITLE } from 'utils/Constants';

const FormItem = Form.Item;
const { TextArea } = Input;

import './style.less';

export interface ContactUsFormProps {
	contactUsStore?: ContactUsStore;
	handleContactFormFieldsValidated: (contactUs: ContactUs, captchaToken?: string) => void;
	handleContactFormVerifyRecaptcha: (captchaToken: string) => void;
}

type AllProps = ContactUsFormProps & FormComponentProps;

@inject('contactUsStore', 'earlyAccessStore')
@observer
class ContactUsForm extends React.Component<AllProps> {
	private captcha?: any;
	private captchaToken?: string;
	private sitekey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

	private onRecaptchaLoaded = () => {
		if (this.captcha) {
			this.captcha.renderExplicitly();
		}
	};

	private executeRecaptcha = () => {
		let submitting: boolean = false;
		if (this.captcha) {
			this.props.form.validateFields((err, values) => {
				if (!err) {
					const contactUs: ContactUs = {
						firstName: values.firstName,
						lastName: values.lastName,
						emailAddress: values.email,
						message: values.message
					};
					if (this.captchaToken) {
						submitting = true;
					}
					this.props.handleContactFormFieldsValidated(contactUs, this.captchaToken);
				}
			});
		}
		if (!submitting && !this.captchaToken) {
			notification.error({
				message: CONTACT_US_CAPTCHA_ERROR_TITLE,
				description: CONTACT_US_CAPTCHA_ERROR_MESSAGE
			});
		}
	};

	private onExpiredRecaptcha = () => {
		this.captchaToken = undefined;
		if (this.captcha) {
			this.captcha.reset();
		}
	};

	private onVerifyRecaptcha = (token: string) => {
		this.captchaToken = token;
		this.props.handleContactFormVerifyRecaptcha(token);
	};

	public resetCaptcha = () => {
		if (this.captcha) {
			this.captcha.reset();
		}
		this.captchaToken = undefined;
	};

	private renderForm() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 24 }
			}
		};

		return (
			<div className="ContactUsForm__Form">
				<Form layout="vertical">
					<FormItem className="Name__Container">
						<Col xs={24} md={11}>
							<FormItem {...formItemLayout}>
								{getFieldDecorator('firstName', {
									rules: [{ required: true, message: 'Please provide a first name' }]
								})(<Input className="ContactUsForm__Input" placeholder="First Name" />)}
							</FormItem>
						</Col>
						<Col xs={2} md={2} className="Name__Spacer">
							<span style={{ display: 'inline-block', width: '100%' }} />
						</Col>
						<Col xs={24} md={11}>
							<FormItem>
								{getFieldDecorator('lastName', {
									rules: [{ required: true, message: 'Please provide a last name' }]
								})(<Input className="ContactUsForm__Input" placeholder="Last Name" />)}
							</FormItem>
						</Col>
					</FormItem>
					<FormItem>
						{getFieldDecorator('email', {
							rules: [
								{
									type: 'email',
									message: 'You have not entered a valid email address'
								},
								{
									required: true,
									message: 'Please provide an email address'
								}
							]
						})(<Input className="ContactUsForm__Input" placeholder="Email Address" />)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('message', {
							rules: [
								{
									required: true,
									message: 'Please provide a message'
								}
							]
						})(<TextArea className="ContactUsForm__Input" rows={8} placeholder="Your Message" />)}
					</FormItem>
					<FormItem>
						<Row>
							<Reaptcha
								id={'visible-captcha-contact-us'}
								ref={(instance: any) => {
									this.captcha = instance;
								}}
								sitekey={this.sitekey}
								size={'normal'}
								theme={'light'}
								explicit={true}
								onLoad={this.onRecaptchaLoaded}
								onVerify={this.onVerifyRecaptcha}
								onExpire={this.onExpiredRecaptcha}
							/>
						</Row>
					</FormItem>
					<FormItem>
						<Row>
							<RoundButton onClick={this.executeRecaptcha} text={'submit'} type={'primary'} />
						</Row>
					</FormItem>
				</Form>
			</div>
		);
	}

	public render() {
		if (this.props.contactUsStore) {
			const { resetCaptcha } = this.props.contactUsStore;
			if (resetCaptcha) {
				this.resetCaptcha();
			}
		}
		return (
			<div className="ContactUsForm__Main">
				<div className="ContactUsForm__Body">{this.renderForm()}</div>
			</div>
		);
	}
}

export default Form.create<ContactUsFormProps>()(ContactUsForm);
