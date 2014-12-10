var build = require('./variables');

module.exports = function(api) {
    var declarations;

    /**
     ==================================================================
     BORDER
     ==================================================================
    */
    declarations = {
        /**
         * Resets
         */
        '.Bd-0': {
            'border': 0
        },
        '.Bd-t-0': {
            'border-top': 0
        },
        '.Bd-end-0': {
            'border-end': 0
        },
        '.Bd-b-0': {
            'border-bottom': 0
        },
        '.Bd-start-0': {
            'border-start': 0
        }
    };

    /**
     ==================================================================
     FONT FAMILY (checked) suffix matches generic font-family
     ==================================================================
     */
    

    // fin
    api.add(declarations);
}
