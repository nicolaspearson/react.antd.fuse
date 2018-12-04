import { AuthStore } from 'store/AuthStore';
import { ContactUsStore } from 'store/ContactUsStore';
import { EarlyAccessStore } from 'store/EarlyAccessStore';
import { FlagStore } from 'store/FlagStore';
import { RouterStore } from 'store/RouterStore';

export class RootStore {
	public authStore: AuthStore;
	public contactUsStore: ContactUsStore;
	public earlyAccessStore: EarlyAccessStore;
	public flagStore: FlagStore;
	public routerStore: RouterStore;

	constructor() {
		this.authStore = new AuthStore(this);
		this.contactUsStore = new ContactUsStore(this);
		this.earlyAccessStore = new EarlyAccessStore(this);
		this.flagStore = new FlagStore(this);
		this.routerStore = new RouterStore(this);
	}
}
