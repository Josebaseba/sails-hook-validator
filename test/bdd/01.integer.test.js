var should  = require('should');

describe('01 IntegerController Test', function(){

  it('should be status 200 - okk!', function(done){
    sails.request({
      method: 'get',
      url: '/'
    }, function(err, clientRes, body){
      if (err) return done(err);
      clientRes.statusCode.should.be.equal(200)
      body.should.be.equal('okk!');
      return done();
    });

  });

});
