// Routes for testing

var controllers = require('../controllers');

module.exports = {

  /* Behavior routes */
  'post /id-required'    : controllers.behavior.idRequired,
  'put /id-name-required': controllers.behavior.idAndNameRequired,
  'put /three-params'    : controllers.behavior.onlyThreeParams,
  'delete /by-type'      : controllers.behavior.byType,
  'get /by-type-parsed'  : controllers.behavior.byTypeAndParsed,

  /* Integer */
  'get /integer': controllers.integer

};
