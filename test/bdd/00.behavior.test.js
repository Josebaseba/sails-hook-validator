var should  = require('should');

describe('00 BehaviorController Test', function(){

  it('should return a 400 code, id is required.', function(done){

    sails.request({
      url: '/id-required',
      method: 'post'
    }, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('id is required.');
      return done();
    });

  });

  it('should return a 200 ok code', function(done){
    sails.request({
      url: '/id-required',
      method: 'post'
    },{
      id: '1'
    }, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      return done();
    });

  });

  it('should return a 400 code, id name required', function(done){
    sails.request({
      url: '/id-name-required',
      method: 'put'
    },{}, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('id, name are required.');
      return done();
    });

  });

  it('should return a 400 code, name required', function(done){
    sails.request({
      url: '/id-name-required',
      method: 'put'
    },{id: 1}, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('name is required.');
      return done();
    });

  });

  it('should return a 200 ok code', function(done){
    sails.request({
      url: '/id-name-required',
      method: 'put'
    },{id: 1, name: 'joseba'}, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      return done();
    });

  });

  it('should return only id, name and surname', function(done){
    var params = {
      id: 1,
      name: 'joseba',
      surname: 'legarreta',
      age: 22,
      height: 1.87
    };
    sails.request({
      url: '/three-params',
      method: 'put'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.equal(1);
      body.name.should.be.equal('joseba');
      body.surname.should.be.equal('legarreta');
      should.not.exist(body.age);
      should.not.exist(body.height);
      return done();
    });

  });

  it('should return 400 id is not int', function(done){
    var params = {
      id: 'somecrazyid',
      name: 'joseba',
      surname: 'legarreta'
    };
    sails.request({
      url: '/by-type',
      method: 'delete'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' id: somecrazyid, has to be int type. ');
      return done();
    });

  });

  it('should return the id param as an integer', function(done){
    var params = {
      id: '1',
      name: 'joseba',
      surname: 'legarreta'
    };
    sails.request({
      url: '/by-type',
      method: 'delete'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.equal(1);
      body.name.should.be.equal('joseba');
      body.surname.should.be.equal('legarreta');
      return done();
    });

  });

  it('should return by type id, name and surname', function(done){
    var params = {
      id: 1,
      name: 'joseba',
      surname: 'legarreta'
    };
    sails.request({
      url: '/by-type',
      method: 'delete'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.name.should.be.equal('joseba');
      body.surname.should.be.equal('legarreta');
      return done();
    });

  });

});
