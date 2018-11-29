import * as React from 'react';

import logo from 'assets/images/theme/logo.svg';

import './style.less';

export interface LogoProps {
	width?: string;
	height?: string;
}

const Logo = (props: LogoProps) => (
	<img className="Logo__Main" style={{ width: props.width, height: props.height }} src={logo} />
);

export default Logo;
