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

  it('should return a 400 code, id is required async.', function(done){
    sails.request({
      url: '/id-required-async',
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

  it('should return a 200 ok code async', function(done){
    sails.request({
      url: '/id-required-async',
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

  it('should return a 400 code, id name required async', function(done){
    sails.request({
      url: '/id-name-required-async',
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

  it('should return a 400 code, name required async', function(done){
    sails.request({
      url: '/id-name-required-async',
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

  it('should return a 200 ok code async', function(done){
    sails.request({
      url: '/id-name-required-async',
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

  it('should return only id, name and surname async', function(done){
    var params = {
      id: 1,
      name: 'joseba',
      surname: 'legarreta',
      age: 22,
      height: 1.87
    };
    sails.request({
      url: '/three-params-async',
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
      surname: 'legarreta',
      age: 22
    };
    sails.request({
      url: '/by-type',
      method: 'delete'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' id: somecrazyid, has to be int type.');
      return done();
    });
  });

  it('should return 400 id is not int async', function(done){
    var params = {
      id: 'somecrazyid',
      name: 'joseba',
      surname: 'legarreta',
      age: 22
    };
    sails.request({
      url: '/by-type-async',
      method: 'delete'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' id: somecrazyid, has to be int type.');
      return done();
    });
  });

  it('should return the id param as an integer', function(done){
    var params = {
      id: '1',
      name: 'joseba',
      surname: 'legarreta',
      age: 22
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

  it('should return the id param as an integer async', function(done){
    var params = {
      id: '1',
      name: 'joseba',
      surname: 'legarreta',
      age: 22
    };
    sails.request({
      url: '/by-type-async',
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
      surname: 'legarreta',
      age: 22
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
      should.not.exist(body.age);
      return done();
    });
  });

  it('should return by type id, name and surname async', function(done){
    var params = {
      id: 1,
      name: 'joseba',
      surname: 'legarreta',
      age: 22
    };
    sails.request({
      url: '/by-type-async',
      method: 'delete'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.name.should.be.equal('joseba');
      body.surname.should.be.equal('legarreta');
      should.not.exist(body.age);
      return done();
    });
  });

  it('should return age and height aren\'t the expected type', function(done){
    var params = {
      id: 1,
      name: 'joseba',
      surname: 'legarreta',
      age: '22a',
      height: '1,88'
    };
    sails.request({
      url: '/by-type-parsed',
      method: 'get'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      var msg = ' age: 22a, has to be int type. height: 1,88, has to be float type.';
      err.body.should.be.equal(msg);
      return done();
    });
  });

  it('should return age and height aren\'t the expected type async', function(done){
    var params = {
      id: 1,
      name: 'joseba',
      surname: 'legarreta',
      age: '22a',
      height: '1,88'
    };
    sails.request({
      url: '/by-type-parsed-async',
      method: 'get'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      var msg = ' age: 22a, has to be int type. height: 1,88, has to be float type.';
      err.body.should.be.equal(msg);
      return done();
    });
  });

  it('should return the same values but parsed', function(done){
    var params = {
      id: '1',
      name: 'joseba',
      surname: 'legarreta',
      age: 22,
      height: '1.88'
    };
    sails.request({
      url: '/by-type-parsed',
      method: 'get'
    }, params, function(err, res, body){
      if(err) return done(err);
      body.id.should.be.equal('1');
      body.name.should.be.equal('JOSEBA');
      body.surname.should.be.equal('legarreta');
      body.age.should.be.equal(22);
      body.height.should.be.equal(1.88);
      return done();
    });
  });

  it('should return the same values but parsed async', function(done){
    var params = {
      id: '1',
      name: 'joseba',
      surname: 'legarreta',
      age: 22,
      height: '1.88'
    };
    sails.request({
      url: '/by-type-parsed-async',
      method: 'get'
    }, params, function(err, res, body){
      if(err) return done(err);
      body.id.should.be.equal('1');
      body.name.should.be.equal('JOSEBA');
      body.surname.should.be.equal('legarreta');
      body.age.should.be.equal(22);
      body.height.should.be.equal(1.88);
      return done();
    });
  });

  it('should return ok with empty message', function(done){
    var params = {};
    sails.request({
      url: '/optional-parameter',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.equal('empty');
      return done();
    });
  });

  it('should return ok with empty message async', function(done){
    var params = {};
    sails.request({
      url: '/optional-parameter-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.equal('empty');
      return done();
    });
  });

  it('should return ok with name equal joseba', function(done){
    var params = {name: 'joseba'};
    sails.request({
      url: '/optional-parameter',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.name.should.be.equal('joseba');
      return done();
    });
  });

  it('should return ok with name equal joseba async', function(done){
    var params = {name: 'joseba'};
    sails.request({
      url: '/optional-parameter-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.name.should.be.equal('joseba');
      return done();
    });
  });

  it('should return ok with empty message', function(done){
    var params = {};
    sails.request({
      url: '/optional-parameter-by-type',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      should.not.exist(body.name);
      return done();
    });
  });

  it('should return ok with empty message async', function(done){
    var params = {};
    sails.request({
      url: '/optional-parameter-by-type-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      should.not.exist(body.name);
      return done();
    });
  });

  it('should return ok with name equal JOSEBA in upperCase', function(done){
    var params = {name: 'joseba'};
    sails.request({
      url: '/optional-parameter-by-type',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.name.should.be.equal('JOSEBA');
      return done();
    });
  });

  it('should return ok with name equal JOSEBA in upperCase async', function(done){
    var params = {name: 'joseba'};
    sails.request({
      url: '/optional-parameter-by-type-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.name.should.be.equal('JOSEBA');
      return done();
    });
  });

  it('should return ok with the number as a string', function(done){
    var params = {name: 123};
    sails.request({
      url: '/optional-parameter-by-type',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      body.name.should.be.equal('123');
      return done();
    });
  });

  it('should return ok with the number as a string async', function(done){
    var params = {name: 123};
    sails.request({
      url: '/optional-parameter-by-type-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      body.name.should.be.equal('123');
      return done();
    });
  });

  it('should return all the params', function(done){
    var params = {
      id: 1,
      name: 'joseba',
      surname: 'legarreta',
      age: '22',
      height: 1.88
    };
    sails.request({
      url: '/some-optional-parameters',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.name.should.be.equal('joseba');
      body.surname.should.be.equal('LEGARRETA');
      body.height.should.be.equal(1.88);
      body.age.should.be.equal(22);
      return done();
    });
  });

  it('should return all the params async', function(done){
    var params = {
      id: 1,
      name: 'joseba',
      surname: 'legarreta',
      age: '22',
      height: 1.88
    };
    sails.request({
      url: '/some-optional-parameters-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.name.should.be.equal('joseba');
      body.surname.should.be.equal('LEGARRETA');
      body.height.should.be.equal(1.88);
      body.age.should.be.equal(22);
      return done();
    });
  });

  it('should return 200 ok with no age, surname and name', function(done){
    var params = {
      id: 1,
      height: 1.88
    };
    sails.request({
      url: '/some-optional-parameters',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.height.should.be.equal(1.88);
      return done();
    });
  });

  it('should return 200 ok with no age, surname and name async', function(done){
    var params = {
      id: 1,
      height: 1.88
    };
    sails.request({
      url: '/some-optional-parameters-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.height.should.be.equal(1.88);
      return done();
    });
  });

  it('should return 200 ok with no age and surname', function(done){
    var params = {
      id: 1,
      height: 1.88,
      name: 'joseba'
    };
    sails.request({
      url: '/some-optional-parameters',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.height.should.be.equal(1.88);
      body.name.should.be.equal('joseba');
      return done();
    });
  });

  it('should return 200 ok with no age and surname async', function(done){
    var params = {
      id: 1,
      height: 1.88,
      name: 'joseba'
    };
    sails.request({
      url: '/some-optional-parameters-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.height.should.be.equal(1.88);
      body.name.should.be.equal('joseba');
      return done();
    });
  });

  it('should return 400 error age and height aren\'t valid type', function(done){
    var params = {
      id: 1,
      height: '1,88',
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/some-optional-parameters',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      var msg = ' height: 1,88, has to be float type. age: 22years, has to be int type.';
      err.body.should.be.equal(msg);
      return done();
    });
  });

  it('should return 400 error age and height aren\'t valid type async', function(done){
    var params = {
      id: 1,
      height: '1,88',
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/some-optional-parameters-async',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      var msg = ' height: 1,88, has to be float type. age: 22years, has to be int type.';
      err.body.should.be.equal(msg);
      return done();
    });
  });

  it('should return 400 id required and not valid age type', function(done){
    var params = {
      height: 1.88,
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/some-optional-parameters',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      var msg = 'id is required. age: 22years, has to be int type.';
      err.body.should.be.equal(msg);
      return done();
    });
  });

  it('should return 400 id required and not valid age type async', function(done){
    var params = {
      height: 1.88,
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/some-optional-parameters-async',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      var msg = 'id is required. age: 22years, has to be int type.';
      err.body.should.be.equal(msg);
      return done();
    });
  });

  it('should return res code 200 ok', function(done){
    var params = {
      id: '12'
    };
    sails.request({
      url: '/no-default-error',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      return done();
    });
  });

  it('should return res code 200 ok async', function(done){
    var params = {
      id: '12'
    };
    sails.request({
      url: '/no-default-error-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      return done();
    });
  });

  it('should return 400 Custom text error', function(done){
    var params = {
      height: 1.88,
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/no-default-error',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('Custom error text');
      return done();
    });
  });

  it('should return 400 Custom text error async', function(done){
    var params = {
      height: 1.88,
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/no-default-error-async',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('Custom error text');
      return done();
    });
  });

  it('should return 200 ok with no age, surname and name', function(done){
    var params = {
      id: 1,
      height: 1.88
    };
    sails.request({
      url: '/complex-no-default-error',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.height.should.be.equal(1.88);
      return done();
    });
  });

  it('should return 200 ok with no age, surname and name async', function(done){
    var params = {
      id: 1,
      height: 1.88
    };
    sails.request({
      url: '/complex-no-default-error-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.height.should.be.equal(1.88);
      return done();
    });
  });

  it('should return 200 ok with no age and surname', function(done){
    var params = {
      id: 1,
      height: 1.88,
      name: 'joseba'
    };
    sails.request({
      url: '/complex-no-default-error',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.height.should.be.equal(1.88);
      body.name.should.be.equal('joseba');
      return done();
    });
  });

  it('should return 200 ok with no age and surname async', function(done){
    var params = {
      id: 1,
      height: 1.88,
      name: 'joseba'
    };
    sails.request({
      url: '/complex-no-default-error-async',
      method: 'post'
    }, params, function(err, res, body){
      if(err) return done(err);
      res.statusCode.should.be.equal(200);
      body.should.be.instanceOf(Object);
      body.id.should.be.instanceOf(Number);
      body.id.should.be.equal(1);
      body.height.should.be.equal(1.88);
      body.name.should.be.equal('joseba');
      return done();
    });
  });

  it('should return 400 error age and height aren\'t valid type', function(done){
    var params = {
      id: 1,
      height: '1,88',
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/complex-no-default-error',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('Custom shit');
      return done();
    });
  });

  it('should return 400 error age and height aren\'t valid type async', function(done){
    var params = {
      id: 1,
      height: '1,88',
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/complex-no-default-error-async',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('Custom shit');
      return done();
    });
  });

  it('should return 400 id required and not valid age type', function(done){
    var params = {
      height: 1.88,
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/complex-no-default-error',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('Custom shit');
      return done();
    });
  });

  it('should return 400 id required and not valid age type async', function(done){
    var params = {
      height: 1.88,
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/complex-no-default-error-async',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('Custom shit');
      return done();
    });
  });

  it('should return 400 with the err complete array async', function(done){
    var params = {
      height: 1.88,
      name: 'joseba',
      age: '22years'
    };
    sails.request({
      url: '/complete-error-object',
      method: 'post'
    }, params, function(err, res, body){
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.instanceOf(String);
      err.body.invalidParameters.should.be.instanceOf(Array);
      return done();
    });
  });

});
