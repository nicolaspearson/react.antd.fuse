import { Button, Form, Icon, Input, notification, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import Footer from 'components/structural/Footer';
import Head from 'components/structural/Head';
import Header from 'components/structural/Header';
import Page from 'components/structural/Page';

import { RouteNames } from 'enums/RouteNames';

import { AuthLogin } from 'models/AuthLogin';

import { AuthStore } from 'store/AuthStore';
import { RouterStore } from 'store/RouterStore';

import { AUTH_LOGIN_API_ERROR_MESSAGE, AUTH_LOGIN_API_ERROR_TITLE } from 'utils/Constants';

import './style.less';

const FormItem = Form.Item;

export interface LoginProps {
	authStore?: AuthStore;
	routerStore?: RouterStore;
}

type AllProps = LoginProps & FormComponentProps;

@inject('authStore', 'routerStore')
@observer
class Login extends React.Component<AllProps> {
	private loginSubmitted: boolean = false;

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
				const authLogin: AuthLogin = {
					username: values.username,
					password: values.password
				};
				this.loginSubmitted = true;
				await this.props.authStore.authLoginRequest(authLogin);
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
			if (!loading && this.loginSubmitted) {
				this.loginSubmitted = false;
				if (data && data.token && this.props.routerStore) {
					const { router } = this.props.routerStore;
					router.navigate(RouteNames.DASHBOARD);
				} else if (errors) {
					// Assign the title and default message
					this.notificationTitle = AUTH_LOGIN_API_ERROR_TITLE;
					this.notificationMessage = AUTH_LOGIN_API_ERROR_MESSAGE;
					// Try to obtain a more detailed message from the request
					if (errors.message) {
						this.notificationMessage = errors.message;
					}
				}
			}
		}
		return (
			<section style={{ height: '100%' }}>
				<Page>
					<Head>
						<title>Login</title>
						<meta name="Description" content="Login" />
					</Head>
					<Header />
					<section className="Login__Container">
						<section className="Login__Form">
							<div className="Login__Logo" />
							<Form className="Login__Ant__Form" onKeyPress={this.onKeyPress}>
								<FormItem>
									{getFieldDecorator('username', {
										rules: [{ required: true, message: 'Your username is required!' }]
									})(
										<Input
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="Username"
										/>
									)}
								</FormItem>
								<FormItem>
									{getFieldDecorator('password', {
										rules: [{ required: true, message: 'Your password is required!' }]
									})(
										<Input
											prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
											type="password"
											placeholder="Password"
										/>
									)}
								</FormItem>
								<Row>
									<Button
										className="Login__Button"
										loading={this.props.authStore && this.props.authStore.loading}
										type="primary"
										onClick={this.handleSubmit}
									>
										Login
									</Button>
									<p className="Login__Assist">
										<span>Username：guest</span>
										<span>Password：guest</span>
									</p>
								</Row>
							</Form>
						</section>
					</section>
					<Footer />
				</Page>
			</section>
		);
	}
}

const LoginForm = Form.create<LoginProps>()(Login);

export default LoginForm;
