const chai = require("chai");
const {compile} = require('../jsonml-ext');


var {expect} = chai;
var should = chai.should();



describe('JSON Markup Language - Extended', function () {
    describe('Compiles simple', () => {
        it('should return a div', function () {
            compile(['div'])
                .should.equal('<div></div>')
        });
        it('should return a div with "Hello, World!"', function () {
            compile(['div', 'Hello, World!'])
                .should.equal('<div>Hello, World!</div>')
        });
        it('should return a div with class="red"', function () {
            compile(['div', {class: 'red'}])
                .should.equal('<div class="red"></div>')
        });
        it('should return a div with class="red", and "Hello, World!"', function () {
            compile(['div', {class: 'red'}, "Hello, World!"])
                .should.equal('<div class="red">Hello, World!</div>')
        });
        it('should throw error "Invalid Format"', function () {
            expect((() => compile(false))).to.throw('Invalid');
        });
        it('should throw error "Invalid Format"', function () {
            expect((() => compile(['a', false]))).to.throw('Invalid format for element');
        });

    });

    describe('Expands emmet abbreviation', () => {
        it('should return a div with id', function () {
            compile(['div#test'])
                .should.equal('<div id="test"></div>')
        });
        it('should return a div with class="red"', function () {
            compile(['div[class=red]'])
                .should.equal('<div class="red"></div>')
        });
        it('should return a div with id and class="red"', function () {
            compile(['div#test[class=red]'])
                .should.equal('<div id="test" class="red"></div>')
        });
        it('should override attributes with attributes object', function () {
            compile(['div[class=removed]', {class: 'updated'}])
                .should.equal('<div class="updated"></div>')
        });
        it('should return an <a> with default href attribute', function () {
            compile(['a'])
                .should.equal('<a href=""></a>')
        });
    });

    describe('Compiles with children', () => {
        it('should return a div with a span child', function () {
            compile(['div', ['span']])
                .should.equal('<div><span></span></div>')
        });
        it('should return a div with attributes a span child', function () {
            compile(['div', {class: 'red'}, ['span']])
                .should.equal('<div class="red"><span></span></div>')
        });
        it('should return a 3 nested divs', function () {
            compile(['div.outer', ['div.middle', ['div.inner', 'Nested content']]])
                .should.equal('<div class="outer"><div class="middle"><div class="inner">Nested content</div></div></div>')
        });
    });
});
