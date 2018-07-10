# JSON Markup Language - Extended

[![npm](https://img.shields.io/npm/v/jsonml-ext.svg)](http://npmjs.com/package/jsonml-ext)
[![Travis](https://img.shields.io/travis/tristanMatthias/jsonml-ext.svg)](https://travis-ci.org/tristanMatthias/jsonml-ext)
[![Codecov](https://img.shields.io/codecov/c/github/codecov/example-python.svg)](https://codecov.io/gh/tristanMatthias/jsonml-ext)

Extended renderer for [JSON Markup Language](http://www.jsonml.org/). Renders JSONML to a HTML string with addition of [Emmet's abbreviation expander](https://www.npmjs.com/package/@emmetio/expand-abbreviation)


## Motivation

This project exists to compile JSON Markup language to HTML with the added benefit of using Emmet's abbreviations to simplify the code and workflow.



## Installation
```
yarn add jsonml-ext
```
This will install the package into your project.


## Usage & options
Once installed, you can import and render JSON ML arrays into HTML strings:
```js
const compile = require('jsonml-ext');

let html;
html = compile(['div']);
// <div></div>
html = compile(['button', {class: 'red', disabled: 'disabled'}]);
// <div class="some-class" disabled></div>
html = compile(['div', [['a', { href: 1, b: 2 }]]]));
```

console.log(compile(['test-ok', [['a', { href: 1, b: 2 }]]]));
For a list of complete options, run `sass-render --help`

**Simple usage**
Renders a `./src/components/button-css.js` file
```
sass-render ./src/components/button.scss
```

**Compile directory**
Renders all scss files in recursively in directory with a custom template
```
sass-render ./src/**/*.scss -t css-template.js
```

**Watching**
Use `-w` to watch for changes
```
sass-render ./src/**/*.scss -w
```
Files will be outputted as `[name]-css.js`. EG: If file is `button.scss`, outputted file will be `button-css.js`.

**Custom template**
Use `-t` to specify the file you'd like to use as a template. `sass-render` will replace `<% content %>` in the file.
```
sass-render ./src/components/button-css.js -t css-template.js
```

**Custom suffix**
Files will be outputted as `[name]-css.js`. EG: If file is `button.scss`, outputted file will be `button-css.js`. This can be changed with the `--suffix` option.


## Importing
Once your SASS files are converted into js/ts files, you can use them inside a library like `lit-element`:

```js
import {html, LitElement} from '@polymer/lit-element';
import CSS from './button-css.js';

export default class Button extends LitElement {
    _render() {
        return html`
            ${CSS}
            <button><slot>Submit</slot></button>
        `;
    }
}
window.customElements.define('my-button', Button);
```


## Custom template
By default, the template is:
```js
import {html} from '@polymer/lit-element';
export const style = html`<style><% content %></style>`;
```

This can be overridden with the `-t` option to your own file. EG:
```js
module.exports.CSS = '<% content %>';
```


## Contributions
All pull requests and contributions are most welcome. Let's make the internet better!


## Moving forward / TODO
- [x] Watch command
- [x] Add tests


## Issues
If you find a bug, please file an issue on the issue tracker on GitHub.


## Credits
The concept of `jsonml-ext` was originally created by Google.
This project is built and maintained by [Tristan Matthias](https://github.com/tristanMatthias).
