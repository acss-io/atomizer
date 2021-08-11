// jshint ignore: start
var React = require('react');
var createReactClass = require('create-react-class');

var Body = require('./Body');

var Application = createReactClass({
    render: function () {
        return (
            <div className="T(0)">
                <Body />
            </div>
        );
    },
});

module.exports = Application;
