import express from 'express'
import chai from 'chai';
import chaiHttp from 'chai-http'
const expect = chai.expect;

chai.use(chaiHttp)
const url = 'http://localhost:5000'

const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

var user = {
    _id: id,
    name: 'arturo',
    email: 'arturo@gmail.com',
    isAdmin: false}


var id = ''
var token  = ''

describe('USER TEST: ',()=>{
    it('Should login Kevin user', (done) =>{
    chai.request(url)
    .post('/api/users/login')
    .send({email:"kevdam10@gmail.com",password:"kevin123"},config)  
    .end(function(err,res){
        token = res.body.token
        expect(res).to.have.status(200);
        done();
    });
    });

    it('Should register Arturo user', (done) =>{
        chai.request(url)
        .post('/api/users/')
        .send({name:"arturo", email:"arturo@gmail.com",password:"arturo123"},config)  
        .end(function(err,res){
            user = res.body
            id = res.body._id
            expect(res).to.have.status(201);
            done();
    });
    });

    it('Should uptdate Arturo user', (done) =>{
        chai.request(url)
        .put('/api/users/'+id)
        .send(user)  
        .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTc1NTkyYjY2YzJlMTY4YmNkMjNiMiIsImlhdCI6MTYyMDUzNzIyMCwiZXhwIjoxNjIzMTI5MjIwfQ.IvBDslN1-DmvsVIsgc7YLlMviHya5tGV1ekbCzOnNw8')
        .end(function(err,res){
            id = res.body._id
            expect(res).to.have.status(200);
            done();
    });
    });

    it('Should delete Arturo user', (done) =>{
        chai.request(url)
        .delete('/api/users/'+ id)
        .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTc1NTkyYjY2YzJlMTY4YmNkMjNiMiIsImlhdCI6MTYyMDUzNzIyMCwiZXhwIjoxNjIzMTI5MjIwfQ.IvBDslN1-DmvsVIsgc7YLlMviHya5tGV1ekbCzOnNw8') 
        .end(function(err,res){
            expect(res.body.message).to.equal('User removed')
            done();
    });
    });
});
