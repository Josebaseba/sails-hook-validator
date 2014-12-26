/*
* helper - Function
* @description: Helper in validation types
*/

var V = require('validator');
var types = require('./validationTypes');

module.exports = function(value, validations){

  if(typeof validations === 'string'){
    return validationType(value, validations.toLowerCase());
  }else if(_.isArray(validations)){
    var error = [];
    _.each(validations, function(validation){
      var valid = validationType(value, validation.toLowerCase());
      if(valid.error) error.push(valid.error); else value = valid.value;
    });
    if(error.length) return {error: error.join(', ')}
    return {value: value};
  }else{
    return {error: 'Error checking validations, valid validations: String or Array ' +
            ' valid formats example: \n' +
            ' req.validator(\'id\', {color: [\'hex\', \'upper\'], email: \'email\'})'};
  }

};

var validationType = function(value, validation){
  if(!types[validation]) return validation + ' is not valid validation type';
  if(validation === 'string'){
    if(typeof validation === 'string'){
      return {value: value};
    }else{
      return {value: V.toString(value)};
    }
  }else if(validation === 'boolean'){
    if(value === '0') value = 0;
    return {value: V.toBoolean(value)};
  }else{
    var method = types[validation].method;
    if(V[method](value)){
      if(types[validation].sanitizer) value = types[validation].sanitizer(value);
      return {value: value};
    }else{
      return {error: value + ' has to be ' + validation + ' type'}
    }
  }
}
