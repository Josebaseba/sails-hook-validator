/* All the validation types and the method name to validate */

var V = require('validator');

/* Add in Validator object the isString method */
V.isString = function(value){
  if(typeof value === 'string') return true; else return false;
};

module.exports = {

  'email': {
    method: 'isEmail',
    sanitizer: V.normalizeEmail
  },
  'url': {
    method: 'isURL'
  },
  'ip': {
    method: 'isIP'
  },
  'alpha': {
    method: 'isAlpha'
  },
  'numeric': {
    method: 'isNumeric'
  },
  'base64': {
    method: 'isBase64'
  },
  'hex': {
    method: 'isHexadecimal'
  },
  'hexcolor': {
    method: 'isHexColor'
  },
  'lower': {
    method: 'isLowercase'
  },
  'tolower': {
    method: 'isString',
    sanitizer: toLowerCase
  },
  'upper': {
    method: 'isUppercase'
  },
  'toupper': {
    method: 'isString',
    sanitizer: toUpperCase
  },
  'string': {
    sanitizer: 'toString'
  },
  'boolean': {
    sanitizer: 'toBoolean'
  },
  'int': {
    method: 'isInt',
    sanitizer: V.toInt
  },
  'float': {
    method: 'isFloat',
    sanitizer: V.toFloat
  },
  'date': {
    method: 'isDate',
    sanitizer: V.toDate
  },
  'json': {
    method: 'isJSON'
  },
  'ascii': {
    method: 'isAscii'
  },
  'mongoid' : {
    method: 'isMongoId'
  },
  'alphanumeric': {
    method: 'isAlphanumeric'
  }

};

/*
* toLowerCase - Function
* @params - value {String}
* Check if is posible to set the string .toLowerCase and if it is lowerCase
*/
function toLowerCase(value){
  console.log(value, value.toLowerCase());
  return value.toLowerCase();
};

/*
* toLowerCase - Function
* @params - value {String}
* Check if is posible to set the string .toLowerCase and if it is lowerCase
*/
function toUpperCase(value){
  return value.toUpperCase();
};
