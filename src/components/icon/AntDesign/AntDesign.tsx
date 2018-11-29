import * as React from 'react';

import antDesign from 'assets/images/png/ant-design.png';

import './style.less';

export interface AntDesignProps {
	width?: string;
	height?: string;
}

const AntDesign = (props: AntDesignProps) => (
	<img
		className="AntDesign__Main"
		style={{ width: props.width, height: props.height }}
		src={antDesign}
	/>
);

export default AntDesign;
