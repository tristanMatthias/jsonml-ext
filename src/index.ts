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

        // If there is a second element...
        if (item[1] !== undefined) {

            // If the second element is a nested list...
            if (item[1] instanceof Array) {
                let arr = item[1] as JMLItem[];
                children = arr.map(compile);
            } else if (item[1] instanceof Object) attributes = item[1];
            else throw new Error("Invalid format for second element");
        }

        if (item[2]) children = (item[2] as JMLItem[]).map(compile);

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
