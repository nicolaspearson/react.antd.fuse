// tslint:disable no-console

export default class Logger {
	public static log(message?: any, ...optionalParams: any[]): void {
		if (process.env.NODE_ENV !== 'production') {
			if (optionalParams && optionalParams.length > 0) {
				console.log(message, optionalParams);
			} else {
				console.log(message);
			}
		}
	}
}
