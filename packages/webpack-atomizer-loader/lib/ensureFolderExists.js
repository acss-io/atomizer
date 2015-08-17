var fs = require('fs');

module.exports = function ensureFolderExists(path, mask) {
    mask = mask || 0777;
    try {
        fs.mkdirSync(path, mask);
        return true;
    } catch (err) {
        if (err.code === 'EEXIST') {
            return true;
        } else {
            return false;
        }
    }
};
