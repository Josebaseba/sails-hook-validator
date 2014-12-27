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
    var params = req.validator(['id', {name: 'string', surname: 'string'}]);
    if(params) return res.ok(params);
  },

  byTypeAndParsed: function(req, res){
    var filter = [
      'id',
      'surname',
      { name: ['string', 'toUpper'], age : 'int', size: 'float' }
    ];
    var params = req.validator(filter);
    if(params) return res.ok(params);
  }

};
