import { flow } from 'mobx';

import { AuthLogin } from 'models/AuthLogin';
import { AuthSignUp } from 'models/AuthSignUp';
import { AuthToken } from 'models/AuthToken';

import AuthApi from 'store/api/AuthApi';

import { BaseStore } from 'store/BaseStore';
import { RootStore } from 'store/RootStore';

export class AuthStore extends BaseStore<AuthToken> {
	public rootStore: RootStore;

	constructor(rootStore: RootStore) {
		super(rootStore);
	}

	public authLoginRequest = flow(function*(this: AuthStore, authLogin: AuthLogin) {
		this.initState();
		this.loading = true;
		try {
			const res = yield AuthApi.postAuthLogin(authLogin);
			this.handleResponse(res);
		} catch (error) {
			this.handleError(error);
		}
	});

	public authSignUpRequest = flow(function*(this: AuthStore, authSignUp: AuthSignUp) {
		this.initState();
		this.loading = true;
		try {
			const res = yield AuthApi.postAuthSignUp(authSignUp);
			this.handleResponse(res);
		} catch (error) {
			this.handleError(error);
		}
	});
}
