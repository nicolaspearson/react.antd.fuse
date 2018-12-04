import { action, observable } from 'mobx';

import { RootStore } from 'store/RootStore';

import Logger from 'logger';

// This base class should only be extended by stores that implement API calls
export abstract class BaseStore<T> {
	public rootStore: RootStore;

	@observable
	public data?: T;

	@observable
	public errors?: any;

	@observable
	public loading: boolean;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		this.initState();
	}

	@action
	public initState() {
		this.data = undefined;
		this.errors = undefined;
		this.loading = false;
	}

	@action
	public handleResponse(res: any) {
		Logger.log('handleResponse', res);
		this.loading = false;
		if (res) {
			if (res.error) {
				this.errors = res;
			} else {
				this.data = res;
			}
		} else {
			this.errors = 'An unknown error occurred';
		}
	}

	@action
	public handleError(error: any) {
		Logger.log('handleError', error);
		this.errors = error;
		this.loading = false;
	}
}
