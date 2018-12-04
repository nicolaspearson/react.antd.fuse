import { AuthLogin } from 'models/AuthLogin';
import { AuthSignUp } from 'models/AuthSignUp';

import ApiUtils from 'utils/ApiUtils';

export default class AuthApi {
	private static API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '';
	private static API_ACCESS_TOKEN = process.env.REACT_APP_API_ACCESS_TOKEN || '';

	public static headers = new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'x-access-token': AuthApi.API_ACCESS_TOKEN
	});

	public static postAuthLogin = (authLogin: AuthLogin) => {
		return ApiUtils.execute(
			AuthApi.headers,
			'POST',
			AuthApi.API_ENDPOINT,
			`/auth/login`,
			authLogin
		);
	};

	public static postAuthSignUp = (authSignUp: AuthSignUp) => {
		return ApiUtils.execute(
			AuthApi.headers,
			'POST',
			AuthApi.API_ENDPOINT,
			`/auth/sign-up`,
			authSignUp
		);
	};
}
