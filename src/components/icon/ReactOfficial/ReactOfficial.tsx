import * as React from 'react';

import reactOfficial from 'assets/images/png/react-official.png';

import './style.less';

export interface ReactOfficialProps {
	width?: string;
	height?: string;
}

const ReactOfficial = (props: ReactOfficialProps) => (
	<img
		className="ReactOfficial__Main"
		style={{ width: props.width, height: props.height }}
		src={reactOfficial}
	/>
);

export default ReactOfficial;
