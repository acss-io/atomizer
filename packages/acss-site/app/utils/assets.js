'use strict';

var objectAssign = require('object-assign');

var assets = require('../build/assets.json');
var images = require('../build/images.json');
var manifest = objectAssign(assets, images);

module.exports = manifest;
