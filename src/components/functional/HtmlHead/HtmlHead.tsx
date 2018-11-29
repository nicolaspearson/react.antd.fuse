import * as React from 'react';

const DEFAULT_TITLE = '';

const META_TYPES = ['name', 'httpEquiv', 'charSet', 'itemProp'];

// tslint:disable jsx-key
const DEFAULT_HEAD = [<meta charSet="utf-8" className="App__Html__Head" />];

const DOMAttributeNames = {
	acceptCharset: 'accept-charset',
	className: 'class',
	htmlFor: 'for',
	httpEquiv: 'http-equiv'
};

export interface HtmlHeadProps {
	children: any;
}

class HtmlHead extends React.Component {
	private updatePromise: any;
	constructor(props: HtmlHeadProps, context?: any) {
		super(props, context);
		this.updatePromise = undefined;
	}

	public updateHead(head: React.ReactChild[]) {
		const promise = (this.updatePromise = Promise.resolve().then(() => {
			if (promise !== this.updatePromise) {
				return;
			}

			this.updatePromise = undefined;
			this.doUpdateHead(head);
		}));
	}

	public doUpdateHead(head: React.ReactChild[]) {
		const tags: any = {};
		head.forEach((h: any) => {
			const components = tags[h.type] || [];
			components.push(h);
			tags[h.type] = components;
		});

		this.updateTitle(tags.title ? tags.title[0] : undefined);

		const types = ['meta', 'base', 'link', 'style', 'script'];
		types.forEach((type) => {
			this.updateElements(type, tags[type] || []);
		});
	}

	public updateTitle(component: any) {
		let title;
		if (component) {
			const { children } = component.props;
			title = typeof children === 'string' ? children : children.join('');
		} else {
			title = DEFAULT_TITLE;
		}
		if (title !== document.title) {
			document.title = title;
		}
	}

	public updateElements(type: any, components: any) {
		const headEl = document.getElementsByTagName('head')[0];
		const oldTags = Array.prototype.slice.call(headEl.querySelectorAll(type + '.App__Html__Head'));
		const newTags = components.map(reactElementToDOM).filter((newTag: any) => {
			for (let i = 0, len = oldTags.length; i < len; i++) {
				const oldTag = oldTags[i];
				if (oldTag.isEqualNode(newTag)) {
					oldTags.splice(i, 1);
					return false;
				}
			}
			return true;
		});

		oldTags.forEach((t: any) => t.parentNode.removeChild(t));
		newTags.forEach((t: any) => headEl.appendChild(t));
	}

	public render() {
		const head: Array<React.DetailedReactHTMLElement<any, any>> = React.Children.map(
			this.props.children,
			(c) => c
		)
			.filter((c) => !!c)
			.map((children) => React.Children.toArray(children))
			.reduce((a, b) => a.concat(b), [])
			.reverse()
			.concat(...DEFAULT_HEAD)
			.filter(unique())
			.reverse()
			.map((c: any) => {
				const className = (c.className ? c.className + ' ' : '') + 'App__Html__Head';

				return React.cloneElement(c, { className });
			});

		this.updateHead(head);

		return <div />;
	}
}

function unique() {
	const tags = new Set();
	const metaTypes = new Set();
	const metaCategories = {};

	return (h: any) => {
		switch (h.type) {
			case 'title':
			case 'base':
				if (tags.has(h.type)) {
					return false;
				}
				tags.add(h.type);
				break;
			case 'meta':
				for (let i = 0, len = META_TYPES.length; i < len; i++) {
					const metaType = META_TYPES[i];
					if (!h.props.hasOwnProperty(metaType)) {
						continue;
					}

					if (metaType === 'charSet') {
						if (metaTypes.has(metaType)) {
							return false;
						}
						metaTypes.add(metaType);
					} else {
						const category = h.props[metaType];
						const categories = metaCategories[metaType] || new Set();
						if (categories.has(category)) {
							return false;
						}
						categories.add(category);
						metaCategories[metaType] = categories;
					}
				}
				break;
		}
		return true;
	};
}

function reactElementToDOM({ type, props }: any) {
	const element = document.createElement(type);
	for (const p in props) {
		if (!props.hasOwnProperty(p)) {
			continue;
		}
		if (p === 'children' || p === 'dangerouslySetInnerHTML') {
			continue;
		}

		const attr = DOMAttributeNames[p] || p.toLowerCase();
		element.setAttribute(attr, props[p]);
	}

	const { children, dangerouslySetInnerHTML } = props;
	if (dangerouslySetInnerHTML) {
		element.innerHTML = dangerouslySetInnerHTML.__html || '';
	} else if (children) {
		element.textContent = typeof children === 'string' ? children : children.join('');
	}
	return element;
}

export default HtmlHead;
