/*
* Helper - Function
* @description: Helper in validation types
*/

const V = require('validator');
const types = require('./validationTypes');

module.exports = function (value, validations, key) {
  value = String(value);

  if (typeof validations === 'string') {
    return validationType(value, validations.toLowerCase(), key);
  }

  if (_.isArray(validations)) {
    const error = [];
    _.each(validations, validation => {
      const valid = validationType(value, validation.toLowerCase(), key);

      if (valid.error) {
        error.push(valid.error);
      } else {
        value = valid.value;
      }
    });

    if (error.length) {
      return {error: error.join(', ')};
    }

    return {value};
  }

  return {
    error: 'Error checking validations, valid validations: String or Array ' +
        ' valid formats example: \n' +
        ' req.validator(\'id\', {color: [\'hex\', \'upper\'], email: \'email\'})'
  };
};

const validationType = function (value, validation, key) {
  if (!types[validation]) {
    return {error: `${validation} is not valid validation type.`};
  }

  if (validation === 'string') {
    if (typeof value === 'string') {
      return {value};
    }

    return {value: V.toString(value)};
  }

  if (validation === 'toboolean') {
    if (value === '0') {
      value = 0;
    }

    return {value: V.toBoolean(value)};
  }

  const {method} = types[validation];
  if (V[method](value)) {
    if (types[validation].sanitizer) {
      value = types[validation].sanitizer(value);
    }

    return {value};
  }

  if (types[validation].type) {
    validation = types[validation].type;
  }

  return {error: `${key}: ${_.escape(value)}, has to be ${validation} type.`, param: key};
};
