// Module dependencies
var Sails = require('sails');

// Load logic from `config/routes` directory
var routes = require('./server/config/routes');
// Load reqValidator hook
var reqValidator = require('../index');

before(function(done) {
  Sails.lift({
    // Configuration for testing purposes
    port: process.env.port || 1992,
    log: {level: process.env.log || 'warn'},
    hooks: {grunt: false, validator: reqValidator},
    globals: {async: false, services: false, models: false},
    routes: routes
  }, function(err, sails) {
    // Start the tests
    if(err) return done(err);
    done(err, sails);
  });
});

// Shut down the server
after(function(done){
  return sails.lower(done);
});
