/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('node-jsx').install({ extension: '.jsx' });

// package dependencies
var express = require('express');
var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
var bodyParser = require('body-parser');
var React = require('react');
var UAParser = require('ua-parser-js');

// other dependencies
var navigateAction = require('flux-router-component').navigateAction;
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));
var app = require('./app');
var assets = require('./utils/assets');

// some options to start the server
var argv = require('minimist')(process.argv.slice(2));
var port = argv.port || process.env.PORT || 3000;
var dev = argv.dev || false;

var server = express();
server.set('state namespace', 'App');
server.use(favicon(__dirname + '/../favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));
server.use(bodyParser.json());

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our services
fetchrPlugin.registerService(require('./services/docs'));

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// Every other request gets the app bootstrap
server.use(function(req, res, next) {

    var context = app.createContext();
    var ua = new UAParser().setUA(req.headers['user-agent']).getResult();

    context.executeAction(navigateAction, {
        url: req.url
    }, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        var AppComponent = app.getAppComponent();
        var doctype = '<!DOCTYPE html>';
        React.withContext(context.getComponentContext(), function () {
            var html = React.renderToStaticMarkup(HtmlComponent({
                assets: assets,
                state: exposed,
                ua: ua,
                dev: dev,
                markup: React.renderToString(AppComponent({
                    context: context.getComponentContext()
                }))
            }));
            res.send(doctype + html);
        });

    });
});

server.listen(port);
console.log('Listening on port ' + port + (dev ? ' - dev mode' : ''));
