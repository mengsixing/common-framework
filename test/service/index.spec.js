const superagent = require('supertest');
const app=require('../../build/app.js');

function request(){
  return superagent(app.listen());
}

describe('GET /user', function() {
    it('user接口是否正确', function(done) {
      request()
        .get('/user')
        .expect(200)
        .end(function(err, res) {
          console.log('这是res',res.body);
          if (err) return done(err);
          if(res.body ==123){
              done();
          }else{
            done('不是123');
          }
        });
    });
  });