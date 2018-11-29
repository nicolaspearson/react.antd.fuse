import { observer } from 'mobx-react';
import * as React from 'react';

import Login from 'pages/Login';

import './style.less';

@observer
class Landing extends React.Component {
	public render() {
		return (
			<section className="Landing__Layout">
				<Login />
			</section>
		);
	}
}

export default Landing;
