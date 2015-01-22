/*
* UrlController
* Check if url validator works
*/

module.exports = function(req, res){

  var url = req.validator({url: 'url'});

  if(url) return res.ok(url);

};
