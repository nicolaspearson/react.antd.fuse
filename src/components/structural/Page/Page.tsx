import classnames from 'classnames';
import * as React from 'react';

import Loader from 'components/structural/Loader';

import './style.less';

export interface PageProps {
	children?: any;
	className?: string;
	useLoader?: boolean;
	spinning?: boolean;
}

const loaderStyle = {
	minHeight: 'calc(100vh - 64px)',
	overflow: 'hidden',
	margin: '0px',
	padding: '0px'
};

const Page = (props: PageProps) => (
	<div
		className={classnames('Page__Main', props.className)}
		style={props.useLoader ? loaderStyle : undefined}
	>
		{props.useLoader ? <Loader spinning={props.spinning} /> : ''}
		{props.children}
	</div>
);

export default Page;
