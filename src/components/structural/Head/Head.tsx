import * as React from 'react';

import HtmlHead from 'components/functional/HtmlHead';

export default ({ children }: any) => (
	<HtmlHead>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		{children}
	</HtmlHead>
);
