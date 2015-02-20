'use strict';

describe('Users', function() {
  it('should not be empty', function(done) {
    User.find().exec(function(err, rows) {
      rows.length.should.be.eql(fixtures.user.length);

      done();
    });
  });

  it('create user without password', function(done) {
    User.create({email:'test1@gmail.com', password: ''}).exec(function createCB(err, created){
      console.log('Created user with email '+ created.email);
      done();
    });
  });

  it('create user with password', function(done) {
    User.create({email:'test2@gmail.com', password: '123456'}).exec(function createCB(err, created){
      console.log('Created user with email '+ created.email);
      done();
    });
  });
});
