import * as React from 'react';

import { Card, Icon } from 'antd';

import './style.less';

export interface NumberCardProps {
	icon: string;
	color: string;
	title: string;
	number: number;
	countUp: object;
	useEasing?: boolean;
	useGrouping?: boolean;
}

const NumberCard = (props: NumberCardProps) => (
	<div className="NumberCard__Main">
		<Card className="Card__Item" bordered={false} bodyStyle={{ padding: 0 }}>
			<Icon className="Icon__Wrap" style={{ color: props.color }} type={props.icon} />
			<div className="Content">
				<p className="Title">{props.title}</p>
				<p className="Number">{props.number}</p>
			</div>
		</Card>
	</div>
);

export default NumberCard;
