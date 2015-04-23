/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import objectAssign from 'object-assign';

// other dependencies
import assets from '../build/assets.json';
import images from '../build/images.json';

const MANIFEST = objectAssign(assets, images);

export default MANIFEST;
