import * as React from 'react';

import { Col, Row } from 'antd';

import DashboardPage from 'components/structural/DashboardPage';
import NumberCard from 'components/ui/NumberCard';

import './style.less';

export interface OverviewProps {
	// Empty
}

interface State {
	loading: boolean;
}

class Overview extends React.Component<OverviewProps, State> {
	public state: State = {
		loading: true
	};

	constructor(props: OverviewProps, context?: any) {
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
		const numbers = [
			{
				icon: 'rocket',
				color: '#2c3a4e',
				title: 'Launches',
				number: 287
			},
			{
				icon: 'team',
				color: '#12a5b4',
				title: 'Customers',
				number: 3241
			},
			{
				icon: 'message',
				color: '#eb1f3a',
				title: 'Active Projects',
				number: 253
			},
			{
				icon: 'fork',
				color: '#6e45c2',
				title: 'Referrals',
				number: 4324
			}
		];
		const numberCards = numbers.map((item: any, key: any) => (
			<Col key={key} lg={6} md={12}>
				<NumberCard {...item} />
			</Col>
		));

		return (
			<DashboardPage
				useLoader={true}
				spinning={this.state.loading}
				antSpinner={true}
				className={'Overview__Body'}
			>
				<Row gutter={24}>{numberCards}</Row>
			</DashboardPage>
		);
	}
}

export default Overview;
