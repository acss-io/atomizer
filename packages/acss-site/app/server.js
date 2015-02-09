/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('node-jsx').install({ extension: '.jsx' });

// package dependencies
var express = require('express');
var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
// var expressState = require('express-state');
var bodyParser = require('body-parser');
var React = require('react');

// other dependencies
var navigateAction = require('flux-router-component').navigateAction;
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));
var app = require('./app');


var server = express();
// expressState.extend(server);
server.set('state namespace', 'App');
server.use(favicon(__dirname + '/../favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));
server.use(bodyParser.json());

// Every other request gets the app bootstrap
server.use(function(req, res, next) {
    // var component = HtmlComponent();
    // var html = React.renderToString(component);
    // res.send(html);

    var context = app.createContext();

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
                state: exposed,
                markup: React.renderToString(AppComponent({
                    context: context.getComponentContext()
                }))
            }));
            res.send(doctype + html);
        });

        // res.expose(app.dehydrate(context), 'App');

        // var AppComponent = app.getAppComponent();
        // var html = React.renderToStaticMarkup(
        //     HtmlComponent({
        //         state: res.locals.state,
        //         context: context.getComponentContext(),
        //         markup: React.renderToString(
        //             AppComponent({
        //                 context: context.getComponentContext()
        //             })
        //         )
        //     })
        // );

        // res.write(html);
        // res.end();
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
