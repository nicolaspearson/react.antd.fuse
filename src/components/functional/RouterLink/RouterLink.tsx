import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RouterStore } from 'store/RouterStore';

import './style.less';

export interface RouterLinkProps {
	children?: any;
	routeName: string;
	routerStore?: RouterStore;
}

@inject('routerStore')
@observer
class RouterLink extends React.Component<RouterLinkProps> {
	private onRouterLinkClick = (event: React.MouseEvent) => {
		if (event) {
			event.preventDefault();
		}
		if (this.props.routerStore) {
			const { router } = this.props.routerStore;
			router.navigate(this.props.routeName);
		}
	};

	public render() {
		return (
			<span
				className="RouterLink__Main"
				style={{ height: '100%', width: '100%' }}
				onClick={this.onRouterLinkClick}
			>
				{this.props.children}
			</span>
		);
	}
}

export default RouterLink;
