import { flow } from 'mobx';

import { EarlyAccess } from 'models/EarlyAccess';

import EarlyAccessApi from 'store/api/EarlyAccessApi';

import { BaseStore } from 'store/BaseStore';
import { RootStore } from 'store/RootStore';

export class EarlyAccessStore extends BaseStore<EarlyAccess> {
	public rootStore: RootStore;

	constructor(rootStore: RootStore) {
		super(rootStore);
	}

	public earlyAccessRequest = flow(function*(this: EarlyAccessStore, earlyAccess: EarlyAccess) {
		this.initState();
		this.loading = true;
		try {
			const res = yield EarlyAccessApi.postEarlyAccess(earlyAccess);
			this.handleResponse(res);
		} catch (error) {
			this.handleError(error);
		}
	});
}
