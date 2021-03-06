import { Card } from 'antd';
import * as React from 'react';

import errorImage from 'assets/images/png/error.png';

import './style.less';

export interface ErrorBoundaryProps {
	children?: any;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
	public state: State = {
		hasError: false
	};

	constructor(props: ErrorBoundaryProps, context: any) {
		super(props, context);
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		this.setState({
			hasError: true
		});
	}

	public render() {
		if (this.state.hasError) {
			return (
				<section className="Error__Main">
					<Card
						className="Error__Card"
						style={{ marginTop: 40, width: 800 }}
						bordered={false}
						cover={<img className="Image__Error__Main" src={errorImage} />}
					>
						<h1 className="Error__Title">Oops</h1>
						<h1 className="Error__Message">Something went wrong, please reload the page!</h1>
						<br />
					</Card>
				</section>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
