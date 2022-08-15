/**
 * Simple function to strip any non-alpha-numeric characters from a string.
 * @param {String} text The text to format
 * @returns {String} Formatted text
 */
export default (text) => text.replace(/[^a-zA-Z0-9-]+/g, '').toLowerCase();
