const {compile} = require('./jsonml-ext');
console.log(compile(false));

let html;
html = compile(['div']);
console.log(html);

// <div></div>
html = compile(['button', {class: 'red', disabled: 'disabled'}]);
console.log(html);

// <div class="some-class" disabled></div>
html = compile(['div', [['a', { href: 1, b: 2 }]]]);
console.log(html);
