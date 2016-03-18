// jshint ignore: start
var React = require('react');
var Body = require('./Body');

var Application = React.createClass({
    render: function () {
        return (
            <div className="T(0)">
                <Body />
            </div>
        );
    }
});

module.exports = Application;
