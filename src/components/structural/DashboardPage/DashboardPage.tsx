import { Icon, Spin } from 'antd';
import classnames from 'classnames';
import * as React from 'react';

import Loader from 'components/structural/Loader';

import PaletteUtils from 'utils/PaletteUtils';

const antSpinnerIcon = (
	<Icon
		type="loading"
		style={{
			fontSize: 32,
			color: `${PaletteUtils.getPaletteVariable('@color-spinner') || '#666666'}`
		}}
		spin={true}
	/>
);

import './style.less';

export interface DashboardPageProps {
	children?: any;
	className?: string;
	useLoader?: boolean;
	inner?: boolean;
	spinning?: boolean;
	antSpinner?: boolean;
}

const loaderStyle = {
	minHeight: '100%',
	overflow: 'hidden'
};

const DashboardPage = (props: DashboardPageProps) => {
	return (
		<section
			className={classnames(props.className, {
				DashboardPage__ContentInner: props.inner
			})}
			style={props.useLoader ? loaderStyle : undefined}
		>
			{props.useLoader ? (
				props.antSpinner ? (
					<section
						className={classnames('Spinner__Container', {
							Spinner__Hidden: !props.spinning
						})}
					>
						<Spin style={{ display: 'flex' }} indicator={antSpinnerIcon} />
					</section>
				) : (
					<Loader spinning={props.spinning} />
				)
			) : (
				undefined
			)}
			{props.children}
		</section>
	);
};

export default DashboardPage;
