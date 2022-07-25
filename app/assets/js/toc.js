import stripChars from '../../libs/stripChars.mjs';
const headings = document.querySelectorAll('#main h2, #main h3');
const { length } = headings;
const items = [];
const tocEl = document.getElementById('toc');

if (length && tocEl) {
    let nested = false;
    for (let x = 0; x < length; x += 1) {
        const name = headings[x].nodeName.toLowerCase();
        const text = headings[x].innerText.replace(/</g, '&lt;').replace(/>/g, '&gt;'); // replace < and > with HTML entities
        const anchor = headings[x].id || stripChars(text); // use id if available, otherwise use stripped text

        // handle nested list items
        if (name === 'h3') {
            if (!nested) {
                items.push('<ul class="ul-list M(0) P(0) Pstart(.5em)!">');
                nested = true;
            } 
            items.push(`<li class="Mstart(20px) Py(5px)"><a href="#${anchor}">${text}</a></li>`);
            continue;
        } else if (nested) {
            items.push('</ul>');
            nested = false;
        }
            
        items.push(`<li class="Py(5px)"><a href="#${anchor}">${text}</a></li>`);
    }
    // generate markup
    tocEl.innerHTML += `<h4 class="D(n) D(b)--lg Fz(.865rem)">On this page</h4><ul class="M(0) P(0)">${items.join('')}</ul>`;
}
