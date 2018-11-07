var should = require('should');

describe('01 IntegerController Test', function () {

  it('should be 400 code id is required', function (done) {
    sails.request({
      url: '/integer',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('id is required.');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/integer',
      method: 'post'
    }, { id: '1' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.id.should.be.equal(1);
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/integer',
      method: 'post'
    }, { id: 1 }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.id.should.be.equal(1);
      return done();
    });
  });

  it('should be 400 code, has to be int type', function (done) {
    sails.request({
      url: '/integer',
      method: 'post'
    }, { id: 1.1 }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' id: 1.1, has to be int type.');
      return done();
    });
  });

  it('should be 400 code, has to be int type', function (done) {
    sails.request({
      url: '/integer',
      method: 'post'
    }, { id: '1notvalid' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' id: 1notvalid, has to be int type.');
      return done();
    });
  });

});
