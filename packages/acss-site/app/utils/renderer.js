var marked = require('marked');
var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return (
        '<h' + level + '>' +
        '<a name="' + escapedText + '" class="anchor"></a>' +
        text + ' ' +
        '<a href="#' + escapedText + '" class="hash-link">#</a>' +
        '</h' + level + '>'
    );
};

module.exports = renderer;
