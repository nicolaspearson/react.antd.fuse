// tslint:disable no-var-requires
const paletteJson = require('./raw/palette.json');

export default class PaletteUtils {
	public static getPalette() {
		return paletteJson;
	}
	public static getPaletteVariable(variableName: string): string | undefined {
		let colorValue: string | undefined;
		if (paletteJson) {
			for (const key of Object.keys(paletteJson)) {
				const item = paletteJson[key];
				if (key === variableName) {
					console.log(`Found color value: ${item} for variable: ${key}`);
					colorValue = item;
					break;
				}
			}
		}
		return colorValue;
	}
}
