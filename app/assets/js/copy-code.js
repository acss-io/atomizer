// find all code blocks on the page
const codeBlocks = document.querySelectorAll('div.highlighter-rouge');

Array.from(codeBlocks).forEach((codeBlock) => {
    // Skip css and diff blocks as they don't need to be copied
    if (codeBlock.classList.contains('language-css') || codeBlock.classList.contains('language-diff')) {
        return;
    }

    // Create copy button
    const button = document.createElement('button');
    button.classList.add('copy-code-button');
    button.setAttribute('aria-label', 'Copy');
    button.setAttribute('tabindex', '0');
    button.setAttribute('title', 'Copy to clipboard');
    button.innerHTML =
        '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
    codeBlock.prepend(button);

    // Attach listener to button
    button.addEventListener('click', () => {
        // Grab code to copy
        const codeContainer = codeBlock.querySelector('.highlight');
        const code = codeContainer.innerText;

        // Copy the code to the user's clipboard
        window.navigator.clipboard?.writeText(code);

        // Update the button content visually
        const { innerHTML: originalHTML } = button;
        button.innerHTML =
            '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="var(--color-success)"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';
        button.setAttribute('aria-label', 'Copied');

        // Add slight delay to toggle the copied class
        setTimeout(() => {
            button.classList.add('copied');
        }, 300);

        // After 2 seconds, reset the button to its initial UI
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
            button.setAttribute('aria-label', 'Copy');
            button.blur();
        }, 2000);
    });
});
