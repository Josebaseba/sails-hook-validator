var should = require('should');

describe('06 Alpha Test', function () {

  it('should be 400 code alpha is required', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('alpha is required.');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'wefweEWFWEFWEFWEF' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal('wefweEWFWEFWEFWEF');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'aaaaa' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal('aaaaa');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'ASDASD' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal('ASDASD');
      return done();
    });
  });

  it('should be 400 code, not valid caracter added', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'htttp://badurl.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' alpha: htttp://badurl.com, has to be alpha type.');
      return done();
    });
  });

  it('should be 400 code, not valid alpha type', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'notvalidemail1' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' alpha: notvalidemail1, has to be alpha type.');
      return done();
    });
  });

  it('should be 400 code, not valid alpha type', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 1 }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' alpha: 1, has to be alpha type.');
      return done();
    });
  });

});
