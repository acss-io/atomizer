import CodeMirror from 'codemirror';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/javascript/javascript.js';
import Atomizer from 'atomizer';

const markup = document.getElementById('markup');
const markupEditor = CodeMirror.fromTextArea(markup, {
    htmlMode: true,
    indentUnit: 4,
    lineWrapping: true,
    mode : 'xml',
    theme: 'material-darker'
});
markupEditor.setSize('100%', '100%');

const css = document.getElementById('css');
const cssEditor = CodeMirror.fromTextArea(css, {
    indentUnit: 4,
    lineWrapping: true,
    mode: 'css',
    readOnly: true,
    theme: 'material-darker',
});
cssEditor.setSize('100%', '100%');

const config = document.getElementById('config');
const configEditor = CodeMirror.fromTextArea(config, {
    indentUnit: 4,
    lineWrapping: true,
    mode: 'javascript',
    theme: 'material-darker',
});
configEditor.setSize('100%', '100%');

function updatePreview() {
    // get css from atomizer
    const atomizer = new Atomizer();
    const config = JSON.parse(configEditor.getValue());
    const foundClasses = atomizer.findClassNames(markupEditor.getValue());
    const finalConfig = atomizer.getConfig(foundClasses, config);
    const acss = atomizer.getCss(finalConfig);

    // save it in the css editor
    cssEditor.setValue(`/** Generated Atomic CSS */ \n\n${acss}`);
    cssEditor.save();

    // update the iframe preview
    const preview = document.getElementById('preview');
    preview.contentDocument.head.innerHTML = `<style>h1 { margin: 0; padding: 0 }${cssEditor.getValue()}</style>`;
    preview.contentDocument.body.innerHTML = markupEditor.getValue();
}

// populate preview iframe with initial markup
updatePreview();

// attach listeners
markupEditor.on('change', updatePreview);
configEditor.on('change', updatePreview);
