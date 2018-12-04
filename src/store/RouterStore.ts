import { action, observable } from 'mobx';
import { DoneFn, NavigationOptions } from 'router5';

import { makeMobxRouter } from 'router/router';
import { LinkData, routes as appRoutes } from 'router/routes';
import { RootStore } from 'store/RootStore';

export class RouterStore {
	public rootStore: RootStore;
	public routes = appRoutes;
	public router = makeMobxRouter(this.routes, this);

	@observable
	public route: any;

	@observable
	public activeRouteName: string;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@action
	public activatedRouteName(routeName: string) {
		this.activeRouteName = routeName;
	}

	@action
	public deActivatedRouteName(routeName: string) {
		// Empty for now
	}

	public navigate = (linkData: LinkData, options?: NavigationOptions, done?: DoneFn) => {
		const { name, params } = linkData;
		this.router.navigate(name, params ? params : {}, options ? options : {}, done);
	};
}
