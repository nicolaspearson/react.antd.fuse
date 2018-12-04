import { action, observable } from 'mobx';

import { Flag } from 'models/Flag';
import { RootStore } from 'store/RootStore';

export class FlagStore {
	public rootStore: RootStore;

	@observable
	public flags: Flag[];

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		this.initState();
	}

	@action
	public initState() {
		this.flags = [];
	}

	@action
	public getFlags() {
		return this.flags;
	}

	@action
	public addFlag(flag: Flag) {
		return this.flags.push(flag);
	}

	@action
	public deleteFlag(deleteFlagName: string) {
		return (this.flags = this.flags.filter((flag) => flag.name !== deleteFlagName));
	}
}
