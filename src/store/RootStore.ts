import { FlagStore } from 'store/FlagStore';
import { RouterStore } from 'store/RouterStore';

export class RootStore {
	public flagStore: FlagStore;
	public routerStore: RouterStore;

	constructor() {
		this.flagStore = new FlagStore(this);
		this.routerStore = new RouterStore(this);
	}
}
