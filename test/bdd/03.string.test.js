var should  = require('should');

describe('03 StringController Test', function(){

  it('should be 400 code id is required', function(done){
    sails.request({
      url: '/string',
      method: 'post'
    }, {}, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('name is required.');
      return done();
    });
  });

  it('should be status 200 ok', function(done){
    sails.request({
      url: '/string',
      method: 'post'
    }, {name: 'joseba'}, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.name.should.be.equal('joseba');
      return done();
    });
  });

  it('should be status 200 ok', function(done){
    sails.request({
      url: '/string',
      method: 'post'
    }, {name: 12345}, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.name.should.be.equal('12345');
      return done();
    });
  });

  it('should be status 200 ok', function(done){
    sails.request({
      url: '/string',
      method: 'post'
    }, {name: true}, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.name.should.be.equal('true');
      return done();
    });
  });

});
