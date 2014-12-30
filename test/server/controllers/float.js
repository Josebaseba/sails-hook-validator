/*
* FloatController
* Check if integer validator works
*/

module.exports = function(req, res, next){

  var param = req.validator({height: 'float'});

  if(param) return res.ok(param);

};
