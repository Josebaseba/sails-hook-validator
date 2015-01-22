/*
* IntegerController
* Check if integer validator works
*/

module.exports = {

  index: function(req, res){
    var email = req.validator({email: 'email'});
    if(email) return res.ok(email);
  },

  googleEmail: function(req, res){
    var googleEmail = req.validator({email: 'toEmail'});
    if(googleEmail) return res.ok(googleEmail);
  }

};
