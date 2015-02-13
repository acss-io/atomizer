module.exports = function(grunt) {
    grunt.initConfig({
        atomizer: {
            default_options: {
                options: {},
                files: {
                    'tmp/default-options.css': ['tests/fixtures/default-config.js'],
                }
            }
        }
    });

    grunt.loadTasks(__dirname + '/../../tasks');

    grunt.registerTask('default', 'atomizer');
};
