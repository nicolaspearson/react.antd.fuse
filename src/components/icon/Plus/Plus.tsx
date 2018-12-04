import { Icon } from 'antd';
import * as React from 'react';

import './style.less';

export interface PlusProps {
	style?: React.CSSProperties;
}

const PlusSvg = () => (
	<svg width="32px" height="32px" fill="currentColor" viewBox="0 0 32 32">
		<path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z" />
	</svg>
);

const Plus = (props: any) => <Icon component={PlusSvg} {...props} />;

export default Plus;
