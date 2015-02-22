'use strict';

var should = require("should");

describe('Users', function() {
  it('should not be empty', function(done) {
    User.find().exec(function(err, rows) {
      rows.length.should.be.eql(fixtures.user.length).and.be.above(0);
      done();
    });
  });

  it('create user without password', function(done) {
    User.create({email:'test1@gmail.com', password: ''}).exec(function createCB(err, user) {
      should.not.exists(err);
      user.should.be.an.instanceOf(Object).and.have.property('id').which.is.a.Number.and.be.above(0);
      done();
    });
  });

  it('create user with password', function(done) {
    User.create({email:'test2@gmail.com', password: '123456'}).exec(function createCB(err, user) {
      should.not.exists(err);
      user.should.be.an.instanceOf(Object).and.have.property('id').which.is.a.Number.and.be.above(0);
      user.password.length.should.be.above(10);
      done();
    });
  });
});
