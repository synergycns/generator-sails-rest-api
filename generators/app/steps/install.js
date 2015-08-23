/**
 * Step 7
 * Where installation are run (npm, bower)
 */

var path = require('path');
var spawn = require('child_process').exec;
var checkDependencies = require('dependency-check');
var recursive = require('recursive-readdir');

module.exports = {
  /**
   * Parse AST and install missing dependencies
   */
  installDependencies: function () {
    if (!this.options['skip-install']) {
      var done = this.async();

      recursive(this.destinationPath(), ['node_modules'], function (error, _files) {
        var files = _files.filter(function (file) {
          return file.split('.').pop() === 'js';
        }).map(function (file) {
          return path.relative(process.cwd(), file);
        });

        checkDependencies({
          path: this.destinationPath('package.json'),
          entries: files
        }, function (error, data) {
          var missingAdapters = ['sails-' + this.answers['database:adapter'].toLowerCase(), 'sails-disk'];
          var missingDependencies = checkDependencies.missing(data.package, data.used).concat(missingAdapters);
          console.log('Installing dependencies...');
          spawn('npm install --save --color always ' + missingDependencies.join(' '),

            function (error, stdout, stderr) {
              console.log(stdout);
              if (error !== null) {
                console.error(stderr);
              }
              console.log('Done!');
              done();
            }

          );

        }.bind(this));
      }.bind(this));
    }
  },

  /**
   * Install other dev dependencies
   */
  installDevDependencies: function () {
    if (!this.options['skip-install']) {
      var done = this.async();
      console.log('Installing development dependencies...');
      spawn('npm install --save --color always',

        function (error, stdout, stderr) {
          console.log(stdout);
          if (error !== null) {
            console.error(stderr);
          }
          console.log('Done!');
          done();
        }

      );
    }
  }
};
