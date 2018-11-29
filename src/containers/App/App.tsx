import { observer } from 'mobx-react';
import * as React from 'react';

import Landing from 'pages/Landing';

import './style.less';

@observer
class App extends React.Component {
	public render() {
		return (
			<section className="App__Layout">
				<Landing />
			</section>
		);
	}
}

export default App;
