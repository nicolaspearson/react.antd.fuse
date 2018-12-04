import classnames from 'classnames';
import * as React from 'react';

import './style.less';

export interface NavProps {
	children?: any;
	stack?: boolean;
}

const Nav = (props: NavProps) => (
	<div className="Nav__Main">
		<ul
			className={classnames('Nav__Container', {
				Nav__Stack: props.stack
			})}
		>
			{React.Children.map(props.children, (Item) => (
				<li>{Item}</li>
			))}
		</ul>
	</div>
);

export default Nav;
