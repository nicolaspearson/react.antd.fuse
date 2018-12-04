import { EarlyAccess } from 'models/EarlyAccess';

import ApiUtils from 'utils/ApiUtils';

export default class EarlyAccessApi {
	private static API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '';
	private static API_ACCESS_TOKEN = process.env.REACT_APP_API_ACCESS_TOKEN || '';

	public static headers = new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'x-access-token': EarlyAccessApi.API_ACCESS_TOKEN
	});

	public static postEarlyAccess = (earlyAccess: EarlyAccess) => {
		return ApiUtils.execute(
			EarlyAccessApi.headers,
			'POST',
			EarlyAccessApi.API_ENDPOINT,
			`/registration/early-access`,
			earlyAccess
		);
	};
}
