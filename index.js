var validator = require('./lib/');

module.exports = function(sails) {

  return {

    initialize: function(cb){

      sails.on('router:route', function(requestState) {

        requestState.req['validator'] = validator.bind(requestState);

      });

      return cb();
    }

  }

};
