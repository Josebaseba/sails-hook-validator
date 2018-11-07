var should = require('should');

describe('05 UrlController Test', function () {

  it('should be 400 code url is required', function (done) {
    sails.request({
      url: '/url',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal('url is required.');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/url',
      method: 'post'
    }, { url: 'http://sailsjs.org' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.url.should.be.equal('http://sailsjs.org');
      return done();
    });
  });

  it('should be status 200 ok, with https', function (done) {
    sails.request({
      url: '/url',
      method: 'post'
    }, { url: 'https://sailsjs.org' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.url.should.be.equal('https://sailsjs.org');
      return done();
    });
  });

  it('should be status 200 ok, with ftp', function (done) {
    sails.request({
      url: '/url',
      method: 'post'
    }, { url: 'ftp://sailsjs.org' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.url.should.be.equal('ftp://sailsjs.org');
      return done();
    });
  });

  it('should be 200 ok code, with no protocol', function (done) {
    sails.request({
      url: '/url',
      method: 'post'
    }, { url: 'aaaaaa.com' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.url.should.be.equal('aaaaaa.com');
      return done();
    });
  });

  it('should be 400 code, not valid protocol type', function (done) {
    sails.request({
      url: '/url',
      method: 'post'
    }, { url: 'htttp://badurl.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' url: htttp://badurl.com, has to be url type.');
      return done();
    });
  });

  it('should be 400 code, not valid url type', function (done) {
    sails.request({
      url: '/url',
      method: 'post'
    }, { url: 'notvalidemail@' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' url: notvalidemail@, has to be url type.');
      return done();
    });
  });

  it('should be 400 code, not valid url type', function (done) {
    sails.request({
      url: '/url',
      method: 'post'
    }, { url: 'http://234·$%·$·$%·$%.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' url: http://234·$%·$·$%·$%.com, has to be url type.');
      return done();
    });
  });

  it('should be 400 code, not valid url type', function (done) {
    sails.request({
      url: '/url',
      method: 'post'
    }, { url: 'no!that\'s!not!a!web.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(String);
      err.body.should.be.equal(' url: no!that&#39;s!not!a!web.com, has to be url type.');
      return done();
    });
  });

});
