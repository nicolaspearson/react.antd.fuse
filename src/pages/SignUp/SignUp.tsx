import { Button, Form, Input, notification, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import Footer from 'components/structural/Footer';
import Head from 'components/structural/Head';
import Header from 'components/structural/Header';
import Page from 'components/structural/Page';

import { RouteNames } from 'enums/RouteNames';

import { AuthSignUp } from 'models/AuthSignUp';
import { User } from 'models/User';

import { AuthStore } from 'store/AuthStore';
import { RouterStore } from 'store/RouterStore';

import { AUTH_SIGN_UP_API_ERROR_MESSAGE, AUTH_SIGN_UP_API_ERROR_TITLE } from 'utils/Constants';

import './style.less';

const FormItem = Form.Item;

export interface SignUpProps {
	authStore?: AuthStore;
	routerStore?: RouterStore;
}

type AllProps = SignUpProps & FormComponentProps;

@inject('authStore', 'routerStore')
@observer
class SignUp extends React.Component<AllProps> {
	private signUpSubmitted: boolean = false;

	private notificationTitle: string | undefined;
	private notificationMessage: string | undefined;

	public componentDidUpdate() {
		if (this.props.authStore && !this.props.authStore.loading) {
			if (this.notificationTitle && this.notificationMessage) {
				notification.error({
					message: this.notificationTitle,
					description: this.notificationMessage
				});
				this.notificationTitle = undefined;
				this.notificationMessage = undefined;
			}
		}
	}

	public handleSubmit = () => {
		this.props.form.validateFields(async (err: any, values: any) => {
			if (!err && this.props.authStore) {
				const user: User = {
					firstName: values.firstName,
					lastName: values.lastName,
					username: values.username,
					password: values.password,
					emailAddress: values.email
				};
				const authSignUp: AuthSignUp = {
					user
				};
				this.signUpSubmitted = true;
				await this.props.authStore.authSignUpRequest(authSignUp);
			}
		});
	};

	private onKeyPress = (event: any) => {
		if (event) {
			if (event.which === 13) {
				event.preventDefault();
				this.handleSubmit();
			}
		}
	};

	public render() {
		const { getFieldDecorator } = this.props.form;
		if (this.props.authStore) {
			const { data, errors, loading } = this.props.authStore;
			if (!loading && this.signUpSubmitted) {
				this.signUpSubmitted = false;
				if (data && data.token && this.props.routerStore) {
					const { router } = this.props.routerStore;
					router.navigate(RouteNames.DASHBOARD);
				} else if (errors) {
					// Assign the title and default message
					this.notificationTitle = AUTH_SIGN_UP_API_ERROR_TITLE;
					this.notificationMessage = AUTH_SIGN_UP_API_ERROR_MESSAGE;
					// Try to obtain a more detailed message from the request
					if (errors.message) {
						this.notificationMessage = errors.message;
					}
				}
			}
		}
		return (
			<Page>
				<Head>
					<title>Sign Up</title>
					<meta name="Description" content="SignUp" />
				</Head>
				<Header />
				<section className="SignUp__Container">
					<section className="SignUp__Form">
						<div className="SignUp__Logo" />
						<Form className="SignUp__Ant__Form" onKeyPress={this.onKeyPress}>
							<FormItem>
								{getFieldDecorator('firstName', {
									rules: [{ required: true, message: 'Please provide a first name' }]
								})(<Input placeholder="First Name" />)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('lastName', {
									rules: [{ required: true, message: 'Please provide a last name' }]
								})(<Input placeholder="Last Name" />)}
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
								})(<Input placeholder="Email Address" />)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('username', {
									rules: [
										{
											min: 3,
											message: 'Your username must be a minimum of 3 characters'
										},
										{ required: true, message: 'Your username is required!' }
									]
								})(<Input placeholder="Username" />)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('password', {
									rules: [
										{
											min: 4,
											message: 'Your password must be a minimum of 4 characters'
										},
										{ required: true, message: 'Your password is required!' }
									]
								})(<Input type="password" placeholder="Password" />)}
							</FormItem>
							<Row>
								<Button
									className="SignUp__Button"
									loading={this.props.authStore && this.props.authStore.loading}
									type="primary"
									onClick={this.handleSubmit}
								>
									Sign Up
								</Button>
							</Row>
						</Form>
					</section>
				</section>
				<Footer />
			</Page>
		);
	}
}

const SignUpForm = Form.create<SignUpProps>()(SignUp);

export default SignUpForm;
