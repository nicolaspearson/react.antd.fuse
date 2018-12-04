import { ContactUs } from 'models/ContactUs';

import ApiUtils from 'utils/ApiUtils';

export default class ContactUsApi {
	private static API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '';
	private static API_ACCESS_TOKEN = process.env.REACT_APP_API_ACCESS_TOKEN || '';

	public static headers = new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'x-access-token': ContactUsApi.API_ACCESS_TOKEN
	});

	public static postContactUs = (contactUs: ContactUs) => {
		return ApiUtils.execute(
			ContactUsApi.headers,
			'POST',
			ContactUsApi.API_ENDPOINT,
			`/registration/contact-us`,
			contactUs
		);
	};
}
