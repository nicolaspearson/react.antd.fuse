import * as React from 'react';

import { Row } from 'antd';

import DashboardPage from 'components/structural/DashboardPage';
import Palette from 'components/ui/Palette';

import './style.less';

export interface ThemeProps {
	// Empty
}

interface State {
	loading: boolean;
}

class Theme extends React.Component<ThemeProps, State> {
	public state: State = {
		loading: true
	};

	constructor(props: ThemeProps, context?: any) {
		super(props, context);
	}

	public componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 500);
	}

	public render() {
		return (
			<DashboardPage
				useLoader={true}
				spinning={this.state.loading}
				antSpinner={true}
				className={'Theme__Body'}
			>
				<Row gutter={24}>
					<Palette />
				</Row>
			</DashboardPage>
		);
	}
}

export default Theme;
