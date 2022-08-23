import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Pulls current directory name from path
 * @param {String} path Path to the modile file
 * @returns {String} Current directory name
 */
export const getDirname = (path) => {
    return dirname(fileURLToPath(path));
};
