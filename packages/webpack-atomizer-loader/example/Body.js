// jshint ignore: start
var React = require('react');
var createReactClass = require('create-react-class');

var Body = createReactClass({
    render: function() {
        return (
            <div>
                <div className=" P(10px) M(20%) Mstart(10px) Bgc(primary-bg)">
                    This should be yellow
                </div>
                <div id="atomic-blue">
                    <div className=" P(10px) M(20%) Mstart(10px) Bgc(primary-bg)">
                        This should be blue
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Body;
