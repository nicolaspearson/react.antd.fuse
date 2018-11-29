import { Button, Form, Input, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import Footer from 'components/structural/Footer';
import Head from 'components/structural/Head';
import Header from 'components/structural/Header';
import Page from 'components/structural/Page';

import { RouteNames } from 'enums/RouteNames';

import { RouterStore } from 'store/RouterStore';

import './style.less';

const FormItem = Form.Item;

export interface LoginProps {
	routerStore?: RouterStore;
}

interface State {
	loading: boolean;
}

@inject('routerStore')
@observer
class Login extends React.Component<LoginProps, State> {
	public state: State = {
		loading: false
	};

	constructor(props: LoginProps, context?: any) {
		super(props, context);
		this.handleSignInClick = this.handleSignInClick.bind(this);
	}

	public handleSignInClick() {
		console.log('Sign in clicked!');
		this.setState(() => ({
			loading: true
		}));
		if (this.props.routerStore) {
			const { router } = this.props.routerStore;
			router.navigate(RouteNames.DASHBOARD);
		}
	}

	public render() {
		return (
			<Page useLoader={true} spinning={this.state.loading}>
				<Head>
					<title>Login</title>
					<meta name="Description" content="Login" />
				</Head>
				<Header />
				<div className="Login__Form">
					<div className="Login__Logo" />
					<form>
						<FormItem hasFeedback={true}>
							<Input placeholder="Username" />
						</FormItem>
						<FormItem hasFeedback={true}>
							<Input type="password" placeholder="Password" />
						</FormItem>
						<Row>
							<Button className="Login__Button" type="primary" onClick={this.handleSignInClick}>
								Sign in
							</Button>
							<p className="Login__Assist">
								<span>Username：guest</span>
								<span>Password：guest</span>
							</p>
						</Row>
					</form>
				</div>
				<Footer />
			</Page>
		);
	}
}

export default Login;
