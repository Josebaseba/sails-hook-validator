// Routes for testing

var controllers = require('../controllers');

module.exports = {

  /* Behavior routes */
  'post /id-required'    : controllers.behavior.idRequired,
  'post /id-required-async': controllers.behavior.idRequiredAsync,
  'put /id-name-required': controllers.behavior.idAndNameRequired,
  'put /id-name-required-async': controllers.behavior.idAndNameRequiredAsync,
  'put /three-params'    : controllers.behavior.onlyThreeParams,
  'put /three-params-async'    : controllers.behavior.onlyThreeParamsAsync,
  'delete /by-type'      : controllers.behavior.byType,
  'delete /by-type-async'      : controllers.behavior.byTypeAsync,
  'get /by-type-parsed'  : controllers.behavior.byTypeAndParsed,
  'get /by-type-parsed-async'  : controllers.behavior.byTypeAndParsedAsync,
  'post /optional-parameter': controllers.behavior.optionalParameter,
  'post /optional-parameter-async': controllers.behavior.optionalParameterAsync,
  'post /optional-parameter-by-type': controllers.behavior.optionalParameterByType,
  'post /optional-parameter-by-type-async': controllers.behavior.optionalParameterByTypeAsync,
  'post /some-optional-parameters': controllers.behavior.someOptionalParameters,
  'post /some-optional-parameters-async': controllers.behavior.someOptionalParametersAsync,
  'post /no-default-error': controllers.behavior.errorWithNoResponse,
  'post /no-default-error-async': controllers.behavior.errorWithNoResponseAsync,
  'post /complex-no-default-error': controllers.behavior.complexNoErrorResponse,
  'post /complex-no-default-error-async': controllers.behavior.complexNoErrorResponseAsync,
  'post /complete-error-object': controllers.behavior.completeErrorObject,

  /* Integer */
  'post /integer': controllers.integer,

  /* Float */
  'post /float': controllers.float,

  /* String */
  'post /string': controllers.string,

  /* Email */
  'post /email'       : controllers.email.index,
  'post /google-email': controllers.email.googleEmail,

  /* Url */
  'post /url': controllers.url,

  /* Alphanumeric */
  'post /alphanumeric': controllers.alphanumeric,

  /* Alpha */
  'post /alpha': controllers.alpha,

  /* Numeric */
  'post /numeric': controllers.numeric

};
