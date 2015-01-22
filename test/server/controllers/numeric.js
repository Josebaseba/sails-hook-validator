/*
* NumericController
* Check if numeric validator works - numbers only
*/

module.exports = function(req, res){

  var numeric = req.validator({numeric: 'numeric'});

  if(numeric) return res.ok(numeric);

};
