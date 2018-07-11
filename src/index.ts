import {expand} from '@emmetio/expand-abbreviation';

export interface JMLAttributes {
    [name: string]: string | number;
}

export interface JMLItemArray extends Array<JMLItem> {}

export type JMLItem =
    string |
    [string] |
    [string, JMLAttributes] |
    [string, JMLItemArray] |
    [string, JMLAttributes, JMLItemArray]

export function compile(item: JMLItem) {

    if (typeof item === 'string') return expand(item);
    if (item instanceof Array) {
        const ele = item[0];

        let attributes = {};
        let children: string[] = [];

        const appendChildren = (ele: string | JMLItem) => {
            // If ele is a single string, add it as text content
            if (typeof ele === 'string') children.push(ele);

            // If the ele is a JMLItem
            else if (ele instanceof Array) children.push(compile(ele))
            else throw new Error("Invalid format for element");
        }

        const rest = item.slice(1).reverse();


        if (rest.length) {
            let cur = rest.pop();
            // First item is attributes...
            if (cur.constructor === {}.constructor) attributes = cur;
            else appendChildren(cur as string | JMLItem);


            while (cur = rest.pop()) {
                appendChildren(cur as string | JMLItem);
            }

        }

        if (attributes) {
            attributes = `[${
                Object.entries(attributes)
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(' ')
            }]`;
        }
        let html = expand(ele + attributes);

        if (children.length) {
            html = html.replace('</', `${children.join('')}</`);
        }


        return html;
    }
    throw new Error('Invalid format');
}
