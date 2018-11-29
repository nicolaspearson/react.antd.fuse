import classnames from 'classnames';
import * as React from 'react';

import './style.less';

export interface LoaderProps {
	spinning?: boolean;
	fullscreen?: boolean;
}

const Loader = (props: LoaderProps) => {
	return (
		<div
			className={classnames('Loader__Main', {
				Loader__Hidden: !props.spinning,
				Loader__Fullscreen: props.fullscreen
			})}
		>
			<div className="Loader__Wrapper">
				<div className="Loader__Inner" />
				<div className="Loader__Text">LOADING</div>
			</div>
		</div>
	);
};

export default Loader;
