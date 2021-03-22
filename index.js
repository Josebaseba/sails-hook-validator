const validator = require('./lib/');

module.exports = function (sails) {
  return {

    initialize(cb) {
      sails.on('router:route', requestState => {
        requestState.req.validator = validator.bind(requestState);
      });

      return cb();
    }

  };
};
