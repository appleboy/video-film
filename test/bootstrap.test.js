var Sails = require('sails');
require('should');

// Global before hook
before(function (done) {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'error'
    },
    models: {
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
