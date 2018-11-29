import { observable } from 'mobx';

import { Flag } from 'models/Flag';
import { RootStore } from 'store/RootStore';

export class FlagStore {
	public rootStore: RootStore;

	@observable
	public flags: Flag[] = [];

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	public getFlags() {
		return this.flags;
	}

	public addFlag(flag: Flag) {
		return this.flags.push(flag);
	}

	public deleteFlag(deleteFlagName: string) {
		return (this.flags = this.flags.filter((flag) => flag.name !== deleteFlagName));
	}
}
