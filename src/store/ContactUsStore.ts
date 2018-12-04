import { flow, observable } from 'mobx';

import { ContactUs } from 'models/ContactUs';

import ContactUsApi from 'store/api/ContactUsApi';

import { BaseStore } from 'store/BaseStore';
import { RootStore } from 'store/RootStore';

export class ContactUsStore extends BaseStore<ContactUs> {
	public rootStore: RootStore;

	@observable
	public resetCaptcha: boolean;

	constructor(rootStore: RootStore) {
		super(rootStore);
	}

	public contactUsRequest = flow(function*(this: ContactUsStore, contactUs: ContactUs) {
		this.initState();
		this.resetCaptcha = false;
		this.loading = true;
		try {
			const res = yield ContactUsApi.postContactUs(contactUs);
			this.handleResponse(res);
			if (this.data && this.data.id) {
				this.resetCaptcha = true;
			}
		} catch (error) {
			this.handleError(error);
		}
	});
}
