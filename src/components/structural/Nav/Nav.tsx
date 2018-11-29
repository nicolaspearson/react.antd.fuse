import * as React from 'react';

import './style.less';

export interface NavProps {
	children?: any;
	stack?: boolean;
}

const Nav = (props: NavProps) => (
	<div>
		<ul className={`Nav__Main ${props.stack ? 'Nav__Stack' : ''}`}>
			{React.Children.map(props.children, (Item) => (
				<li>{Item}</li>
			))}
		</ul>
	</div>
);

export default Nav;
