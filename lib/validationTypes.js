/* All the validation types and the method name to validate */

module.exports = {

  'email': {
    method: 'isEmail',
    sanitizer: 'normalizeEmail'
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
  'upper': {
    method: 'isUppercase'
  },
  'string': {
    sanitizer: 'toString'
  },
  'boolean': {
    sanitizer: 'toBoolean'
  },
  'int': {
    method: 'isInt',
    sanitizer: 'toInt'
  },
  'float': {
    method: 'isFloat',
    sanitizer: 'toFloat'
  },
  'date': {
    method: 'isDate',
    sanitizer: 'toDate'
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

}
