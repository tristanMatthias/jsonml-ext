![Banner](banner.png 'Banner')
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
Read the [JSONML website](http://www.jsonml.org/) for more information on JSONML.

Once installed, you can import and render JSON ML arrays into HTML strings:
```js
const {compile} = require('jsonml-ext');

compile(['div']);
// <div></div>

compile(['button', {class: 'red', disabled: true}]);
// <button class="red" disabled='true'></button>

compile(['div', ['a', {target: '_blank' }]]);
// <div><a href=' target='_blank'></a></div>
```

**The JML Item**
The JML item passed in contains up to 3 items:
1. The Emmet abbreviation to be expanded. EG: `a#clickme[target='_blank']`
2. The attributes as a JSON object, OR a nested array of JML items
3. Array of JML items. This item can only be passed if the attributes in item 2 was passed

EG:
*Simple usage*
```js
// Pass in only the first item
compile(['div#test'])
// '<div id='test'></div>'
```
*Text content usage*
```js
// Pass in only the first item
compile(['div#test', 'Lorem Ipsum'])
// '<div id='test'>Lorem Ipsum</div>'
```
*Attribute usage*
```js
// Pass in the first item and it's attributes
compile(['div[class="red"]', {class: 'override'}, 'Lorem Ipsum'])
// '<div class="override">Lorem Ipsum</div>'
```
*Nested variation 1*
```js
// Omit the attributes
compile(['div[class="red"]', ['span', 'Nested content']])
// '<div class="red"><span>Nested content</span></div>'
```
*Nested variation 2*
```js
// Pass in the first item, and it's attributes as the SECOND item. The remaining
// items are just JMLItems
compile(['div[class="red"]', {class: 'override'}, ['span']])
// '<div class="override"><span></span></div>'
```
*Siblings*
```js
// You can pass as many JMLItems at the end of the array, and they will be added
// as siblings
compile(['div[class="red"]', ['span.sibling1'], 'text content', ['span.sibling2']])
// '<div class="override"><span class="sibling1"></span>text content<span class="sibling2"></span></div>'
```


## Contributions
All pull requests and contributions are most welcome. Let's make the internet better!


## Moving forward / TODO
- [x] Add tests


## Issues
If you find a bug, please file an issue on the issue tracker on GitHub.


## Credits
This project is built and maintained by [Tristan Matthias](https://github.com/tristanMatthias).
