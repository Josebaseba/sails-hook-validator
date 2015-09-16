/*
* BehaviorController
* Controller for behaviors like what happens if we have more attrs than expec.
* If we dont have the params that we are asking for, or the types doesn't match..
*/

module.exports = {

  idRequired: function(req, res){
    if(req.validator('id')) return res.ok();
  },

  idRequiredAsync: function(req, res){
    req.validator('id', false, function(err, params){
      if(err) return res.badRequest(err.message);
      return res.ok();
    });
  },

  idAndNameRequired: function(req, res){
    if(req.validator(['id', 'name'])) return res.ok();
  },

  idAndNameRequiredAsync: function(req, res){
    req.validator(['id', 'name'], function(err, result){
      if(!err) return res.ok();
    });
  },

  onlyThreeParams: function(req, res){
    var params = req.validator(['id', 'name', 'surname']);
    if(params) return res.ok(params);
  },

  onlyThreeParamsAsync: function(req, res){
    req.validator(['id', 'name', 'surname'], function(err, params){
      if(!err) return res.ok(params);
    });
  },

  byType: function(req, res){
    var params = req.validator(['name', {id: 'int', surname: 'string'}]);
    if(params) return res.ok(params);
  },

  byTypeAsync: function(req, res){
    req.validator(['name', {id: 'int', surname: 'string'}], function(err, params){
      if(!err) return res.ok(params);
    });
  },

  byTypeAndParsed: function(req, res){
    var filter = [
      'id', 'surname',
      { name: ['string', 'toUpper'], age : 'int', height: 'float' }
    ];
    var params = req.validator(filter);
    if(params) return res.ok(params);
  },

  byTypeAndParsedAsync: function(req, res){
    var filter = [
      'id', 'surname',
      { name: ['string', 'toUpper'], age : 'int', height: 'float' }
    ];
    req.validator(filter, false, function(err, params){
      if(err) return res.badRequest(err.message);
      return res.ok(params);
    });
  },

  optionalParameter: function(req, res){
    var params = req.validator('?name');
    if(params.name) return res.ok(params); else return res.ok('empty');
  },

  optionalParameterAsync: function(req, res){
    req.validator('?name', function(err, params){
      if(params && params.name) return res.ok(params);
      if(params && !params.name) return res.ok('empty');
    });
  },

  optionalParameterByType: function(req, res){
    var params = req.validator({'?name': ['string', 'lower', 'toUpper']});
    if(params) return res.ok(params);
  },

  optionalParameterByTypeAsync: function(req, res){
    req.validator({'?name': ['string', 'lower', 'toUpper']}, function(err, params){
      if(!err) return res.ok(params);
    });
  },

  someOptionalParameters: function(req, res){
    var filter = [
      'id', '?name',
      {'?surname': ['string', 'toUpper'], height: 'float', '?age': 'int'}
    ];
    var params = req.validator(filter);
    if(params) return res.json(params);
  },

  someOptionalParametersAsync: function(req, res){
    var filter = [
      'id', '?name',
      {'?surname': ['string', 'toUpper'], height: 'float', '?age': 'int'}
    ];
    req.validator(filter, false, function(err, params){
      if(err) return res.badRequest(err.message);
      return res.json(params);
    });
  },

  errorWithNoResponse: function(req, res){
    var params = req.validator('id', false);
    if(params) return res.ok(); else return res.badRequest('Custom error text');
  },

  errorWithNoResponseAsync: function(req, res){
    req.validator('id', false, function(err, params){
      if(err) return res.badRequest('Custom error text');
      return res.ok();
    });
  },

  complexNoErrorResponse: function(req, res){
    var filter = [
      'id', '?name',
      {'?surname': ['string', 'toUpper'], height: 'float', '?age': 'int'}
    ];
    var params = req.validator(filter, false);
    if(params) return res.ok(params); else return res.badRequest('Custom shit');
  },

  complexNoErrorResponseAsync: function(req, res){
    var filter = [
      'id', '?name',
      {'?surname': ['string', 'toUpper'], height: 'float', '?age': 'int'}
    ];
    req.validator(filter, false, function(err, params){
      if(err) return res.badRequest('Custom shit');
      return res.ok(params);
    });
  },

  completeErrorObject: function(req, res){
    var filter = [
      'id', '?name',
      {'?surname': ['string', 'toUpper'], height: 'float', '?age': 'int'}
    ];
    req.validator(filter, false, function(err, params){
      if(err) return res.badRequest(err);
      return res.ok(params);
    });
  }

};
