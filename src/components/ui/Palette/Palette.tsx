import * as React from 'react';

import PaletteUtils from 'utils/PaletteUtils';

import './style.less';

class Palette extends React.Component {
	public render() {
		const paletteElements: JSX.Element[] = [];
		const palette = PaletteUtils.getPalette();
		let i: number = 0;
		Object.keys(palette).forEach((color) => {
			i++;
			paletteElements.push(
				<div className="Palette__Item" key={i} style={{ backgroundColor: palette[color] }}>
					<p className="Palette__Title">{color}</p>
					<p className="Palette__Detail">{palette[color]}</p>
				</div>
			);
		});
		return <section className="Palette__Main">{paletteElements}</section>;
	}
}

export default Palette;
