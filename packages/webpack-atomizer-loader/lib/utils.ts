import * as fs from 'fs';
import * as path from 'path';

const PATH_SEP: string = '/';

export function writeCssFile(cssDest: string, cssString: string): Promise<Function> {
    return new Promise((resolve, reject) => {
        fs.writeFile(cssDest, cssString, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function ensureFolderExists(path: string, mask: string = '0777'): boolean {
    let isExisted: boolean = false;
    try {
        fs.mkdirSync(path, mask);
        isExisted = true;
    } catch (err) {
        if (err.code === 'EEXIST') {
            isExisted = true;
        }
    }
    return isExisted;
}

export function ensureExists(filePath: string): boolean {
    let dirs: string[] = path.dirname(filePath).split(PATH_SEP);
    let result: boolean = true;
    let currentPath: string;

    if (dirs[0] === '') {
        dirs[0] = path.sep;
    }

    dirs.forEach((_, i, p) => {
        currentPath = path.join.apply(null, p.slice(0, i + 1));
        if (!ensureFolderExists(currentPath)) {
            result = false;
        }
    });
    return result;
}
