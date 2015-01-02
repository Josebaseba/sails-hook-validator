/*
* Validator - Function
* @description: Service for check params that arrives in the request
* If params aren't valid we send a 400 BadRequest else we return a parsed Object
*/

var errorsParser = require('./errorsParser');
var helper = require('./helper');

module.exports = function Validator(rules, sendResponse){

  var req = this.req;
  var res = this.res;
  var params = req.params.all();
  var errors = [], typeRules = {}, parsedParams = {};

  /* Set the sendResponse variable to send or not res.400 in case of error */
  if(sendResponse === undefined || sendResponse !== false) sendResponse = true;

  /*
  * Check if the rules are a simple single param and if the param exist
  */
  if(typeof rules === 'string'){
    var key = rules;
    if(key[0] === '?' && params[key.slice(1)] === undefined){
      return {};
    }else if(key[0] === '?'){
      key = key.slice(1);
    }else if(params[key] === undefined){
      if(sendResponse) res.send(400, key + ' is required.');
      return false;
    }
    parsedParams[key] = params[key];
  }

  /*
  * Check if the rules are an Object and in that case check the type of them
  */
  if(_.isPlainObject(rules)){
    _.each(rules, function(value, key){
      if(key[0] === '?' && params[key.slice(1)] === undefined) return null;
      else if(key[0] === '?') key = key.slice(1);
      var param = params[key];
      if(param === undefined) return errors.push(key);
      var validation = helper(param, value, key);
      if(validation.error) return errors.push(validation);
      parsedParams[key] = validation.value;
    });
  }

  /*
  * Check if the rules are an Array of elements
  * If the value is a String, check if it exists in the params
  * If the value is an Object, check by key/value if the type is valid
  * In the a diferent case, return a not valid type error
  */
  if(_.isArray(rules)){
    _.each(rules, function(rule){
      if(typeof rule === 'string'){
        var key = rule;
        if(key[0] === '?' && params[key.slice(1)] === undefined) return null;
        else if(key[0] === '?') key = key.slice(1);
        if(params[key] === undefined) return errors.push(key);
        parsedParams[key] = params[key];
      }else if(_.isPlainObject(rule)){
        _.each(rule, function(value, key){
          if(key[0] === '?' && params[key.slice(1)] === undefined) return null;
          else if(key[0] === '?') key = key.slice(1);
          var param = params[key];
          if(param === undefined) return errors.push(key);
          var validation = helper(param, value, key);
          if(validation.error) return errors.push(validation);
          parsedParams[key] = validation.value;
        });
      }else{
        errors.push(rule + ' isn\'t a valid type, valid types: String - Object');
      }
    });
  }

  /* In case of errors return a badRequest with the errors parsed */
  if(errors.length){
    if(sendResponse){
      var parsedErrors = errorsParser(errors);
      res.send(400, parsedErrors);
    }
    return false;
  }

  return parsedParams;

};
