/*
* AlphaController
* Check if alpha validator works - charaters only
*/

module.exports = function(req, res){

  var alpha = req.validator({alpha: 'alpha'});

  if(alpha) return res.ok(alpha);

};
