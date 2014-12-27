var should  = require('should');

describe('00 BehaviorController Test', function(){

  it('should 400 id is required.', function(done){

    sails.request({
      url: '/id-required',
      method: 'post'
    }, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('id is required.');
      return done();
    });

  });

});
