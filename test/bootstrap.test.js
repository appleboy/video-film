var Sails = require('sails');
require('should');

// Global before hook
before(function (done) {
  this.timeout(60000);
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'error'
    },
    models: {
      connection: 'testing',
      migrate: 'drop'
    }
  }, function(err, server) {
    if (err) {
      return done(err);
    }

    done(err, server);
  });
});

// Global after hook
after(function (done) {
  console.log(); // Skip a line before displaying Sails lowering logs
  sails.lower(done);
});
