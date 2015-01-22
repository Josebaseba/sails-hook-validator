// Controllers loader the main path with all the controllers

module.exports = {

  behavior: require('./behavior'),

  integer: require('./integer'),

  float: require('./float'),

  string: require('./string'),

  email: require('./email'),

  url: require('./url'),

  alphanumeric: require('./alphanumeric'),

  alpha: require('./alpha'),

  numeric: require('./numeric')

};
