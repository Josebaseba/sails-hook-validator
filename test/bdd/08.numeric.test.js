var should = require('should');

describe('06 Numeric Test', function () {

  it('should be 400 code numeric is required', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('numeric is required.');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: '123' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.numeric.should.be.equal('123');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: 123 }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.numeric.should.be.equal(123);
      return done();
    });
  });

  it('should be 400 code, not valid caracter added', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: 'htttp://badurl.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' numeric: htttp://badurl.com, has to be numeric type.');
      return done();
    });
  });

  it('should be 400 code, not valid numeric type', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: '12311a' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' numeric: 12311a, has to be numeric type.');
      return done();
    });
  });

  it('should be 400 code, not valid numeric type', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: '1,1' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' numeric: 1,1, has to be numeric type.');
      return done();
    });
  });

  it('should be 400 code, not valid numeric type', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: '1.1' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' numeric: 1.1, has to be numeric type.');
      return done();
    });
  });

});
