/** Global definitions for development **/

// for regular imports
// e.g import * as styles from "./main.css"
declare module '*.css' {
	const styles: any;
	export = styles;
}

// for regular imports
// e.g import * as styles from "./main.scss"
declare module '*.scss' {
	const styles: any;
	export = styles;
}

// for regular imports
// e.g import * as styles from "./main.less"
declare module '*.less' {
	const styles: any;
	export = styles;
}

declare module '*.svg' {
	const content: any;
	export default content;
}

declare module '*.jpeg';
declare module '*.jpg';
declare module '*.gif';
declare module '*.png';

// Omit type https://github.com/Microsoft/TypeScript/issues/12215
type Diff<T extends string, U extends string> = ({ [P in T]: P } &
	{ [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
