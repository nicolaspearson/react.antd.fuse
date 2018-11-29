import * as React from 'react';

import { Calendar as AntCalendar } from 'antd';

import DashboardPage from 'components/structural/DashboardPage';

import './style.less';

export interface CalendarProps {
	// Empty
}

interface State {
	loading: boolean;
}

class Calendar extends React.Component<CalendarProps, State> {
	public state: State = {
		loading: true
	};

	constructor(props: CalendarProps, context?: any) {
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
				className={'Calendar__Body'}
			>
				<AntCalendar />
			</DashboardPage>
		);
	}
}

export default Calendar;
