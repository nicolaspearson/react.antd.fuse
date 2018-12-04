import * as React from 'react';
import * as Reaptcha from 'reaptcha';

import './style.less';

export interface RecaptchaProps {
	id: string;
	render: 'automatic' | 'explicit';
	size: 'compact' | 'normal' | 'invisible';
	theme: 'light' | 'dark';
	renderedRecaptcha: (instance: any) => void;
	verifyRecaptcha: (token: string) => void;
	expiredRecaptcha: () => void;
}

class Recaptcha extends React.Component<RecaptchaProps> {
	private sitekey = process.env.REACT_APP_RECAPTCHA_INVISIBLE_SITE_KEY;

	constructor(props: RecaptchaProps, context?: any) {
		super(props, context);
	}

	public render() {
		const { render, size, theme } = this.props;
		const explicit = render === 'explicit';

		return (
			<div className="Recaptcha__Main">
				<Reaptcha
					id={this.props.id}
					ref={this.props.renderedRecaptcha}
					inject={true}
					sitekey={this.sitekey}
					size={size}
					theme={theme}
					explicit={explicit}
					onVerify={this.props.verifyRecaptcha}
					onExpire={this.props.expiredRecaptcha}
				/>
			</div>
		);
	}
}

export default Recaptcha;
