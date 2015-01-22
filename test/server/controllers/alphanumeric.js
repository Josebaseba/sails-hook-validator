/*
* AlphaController
* Check if alpha validator works - numbers and charaters only
*/

module.exports = function(req, res){

  var alpha = req.validator({alpha: 'alphanumeric'});

  if(alpha) return res.ok(alpha);

};
