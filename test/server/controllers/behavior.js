/*
* BehaviorController
* Controller for behaviors like what happens if we have more attrs than expec.
* If we dont have the params that we are asking for, or the types doesn't match..
*/

module.exports = {

  idRequired: function(req, res){
    if(req.validator('id')) return res.ok();
  },

  idAndNameRequired: function(req, res){
    if(req.validator(['id', 'name'])) return res.ok();
  },

  onlyThreeParams: function(req, res){
    var params = req.validator(['id', 'name', 'surname']);
    if(params) return res.ok(params);
  },

  byType: function(req, res){
    var params = req.validator(['name', {id: 'int', surname: 'string'}]);
    if(params) return res.ok(params);
  },

  byTypeAndParsed: function(req, res){
    var filter = [
      'id', 'surname',
      { name: ['string', 'toUpper'], age : 'int', height: 'float' }
    ];
    var params = req.validator(filter);
    if(params) return res.ok(params);
  },

  optionalParameter: function(req, res){
    var params = req.validator('?name');
    if(params.name) return res.ok(params); else return res.ok('empty');
  },

  optionalParameterByType: function(req, res){
    var params = req.validator({'?name': ['string', 'lower', 'toUpper']});
    if(params) return res.ok(params);
  },

  someOptionalParameters: function(req, res){
    var filter = [
      'id', '?name',
      {'?surname': ['string', 'toUpper'], height: 'float', '?age': 'int'}
    ];
    var params = req.validator(filter);
    if(params) return res.json(params);
  }

};
