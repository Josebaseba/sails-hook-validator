/*
 * Validator - Function
 * @description: Service for check params that arrives in the request
 * If params aren't valid we send a 400 BadRequest else we return a parsed Object
 */

const errorsParser = require('./errorsParser');
const helper = require('./helper');

// eslint-disable-next-line func-names
module.exports = function Validator(rules, sendResponse, cb) {
  const {req} = this;
  const {res} = this;
  const parameters = req.allParams();
  const parsedParameters = {};

  if (_.isFunction(sendResponse)) {
    cb = sendResponse;
  }

  if (sendResponse === undefined || sendResponse !== false) {
    sendResponse = true;
  }

  // Check if cb is a valid callback
  if (cb && !_.isFunction(cb)) {
    cb = null;
  }

  // Check if rules are a simple single param and if the param exist
  if (typeof rules === 'string') {
    let key = rules;
    if (key[0] === '?' && parameters[key.slice(1)] === undefined) {
      if (cb) {
        return cb(null, {});
      }

      return {};
    }

    // Optional
    if (key[0] === '?') {
      key = key.slice(1);
    } else if (parameters[key] === undefined) {
      if (sendResponse) {
        res.status(400).send(`${key} is required.`);
      }

      if (cb) {
        return cb({message: `${key} is required.`, invalidParameters: [key]});
      }

      return false;
    }

    parsedParameters[key] = parameters[key];
  }

  const errors = [];

  // Check if the rules are an Object and in that case check the type of them
  if (_.isPlainObject(rules)) {
    _.each(rules, (value, key) => {
      if (key[0] === '?' && parameters[key.slice(1)] === undefined) {
        return null;
      }

      if (key[0] === '?') {
        key = key.slice(1);
      }

      const parameter = parameters[key];

      if (parameter === undefined) {
        return errors.push(key);
      }

      const validation = helper(parameter, value, key);

      if (validation.error) {
        return errors.push(validation);
      }

      parsedParameters[key] = validation.value;
    });
  }

  /*
   * Check if the rules are an Array of elements
   * If the value is a String, check if it exists in the params
   * If the value is an Object, check by key/value if the type is valid
   * In the a different case, return a not valid type error
   */
  if (_.isArray(rules)) {
    _.each(rules, rule => {
      if (typeof rule === 'string') {
        let key = rule;

        if (key[0] === '?' && parameters[key.slice(1)] === undefined) {
          return null;
        }

        if (key[0] === '?') {
          key = key.slice(1);
        }

        if (parameters[key] === undefined) {
          return errors.push(key);
        }

        parsedParameters[key] = parameters[key];
      } else if (_.isPlainObject(rule)) {
        _.each(rule, (value, key) => {
          if (key[0] === '?' && parameters[key.slice(1)] === undefined) {
            return null;
          }

          if (key[0] === '?') {
            key = key.slice(1);
          }

          const parameter = parameters[key];

          if (parameter === undefined) {
            return errors.push(key);
          }

          const validation = helper(parameter, value, key);

          if (validation.error) {
            return errors.push(validation);
          }

          parsedParameters[key] = validation.value;
        });
      } else {
        errors.push(`${rule} isn't a valid type, valid types: String - Object`);
      }
    });
  }

  // In case of errors return a badRequest with the errors parsed
  if (errors.length) {
    if (sendResponse) {
      const parsedErrors = errorsParser(errors);
      res.status(400).send(parsedErrors);
    }

    const error = {message: errorsParser(errors), invalidParameters: []};
    error.invalidParameters = _.compact(_.map(errors, error => {
      return error.param ? error.param : error;
    }));

    if (cb) {
      return cb(error);
    }

    return false;
  }

  if (cb) {
    cb(null, parsedParameters);
  } else {
    return parsedParameters;
  }
};
