import * as React from 'react';

import RouterLink from 'components/functional/RouterLink';
import Nav from 'components/structural/Nav';

import { RouteNames } from 'enums/RouteNames';

import './style.less';

export interface SiteNavProps {
	isOpen?: boolean;
	closeNav?: () => void;
}

const SiteNav = (props: SiteNavProps) => (
	<div className={`SiteNav ${props.isOpen ? 'IsOpen' : ''}`} onClick={props.closeNav}>
		<div className="SiteNav__Inner">
			<Nav>
				<RouterLink routeName={RouteNames.HOME}>
					<span className="SiteNav__Item">Home</span>
				</RouterLink>

				<RouterLink routeName={RouteNames.DASHBOARD}>
					<span className="SiteNav__Item">Dashboard</span>
				</RouterLink>
			</Nav>
		</div>
	</div>
);

export default SiteNav;
