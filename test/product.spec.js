import express from 'express'
import chai from 'chai';
import chaiHttp from 'chai-http'
const expect = chai.expect;

chai.use(chaiHttp)
const url = 'http://EC2Co-EcsEl-PJTMJ8PS8AWM-1718674474.us-east-2.elb.amazonaws.com:5000'

var id = ''

const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

var product = {
                price:0,
                countInStock:10,
                name:"Sample name",
                user:"608ded8e374b31b835a78187",
                image:"/images/sample.jpg",
                tag:"Jugador",
                category:"TOTS",
                description:"Valverde tots"}


describe('PRODUCT TEST: ',()=>{

    before('Login user', (done) =>{
        chai.request(url)
        .post('/api/users/login')
        .send({email:"kevdam10@gmail.com",password:"kevin123"},config)  
        .end(function(err,res){
            done();
        });
        });

    it('Should get list of products', (done) =>{
        chai.request(url)
        .get('/api/products?keyword=""&pageNumber=""')
        .end(function(err,res){
            expect(res).to.have.status(200);
            done();
    });
    });


    it('Should create a product', (done) =>{
        chai.request(url)
        .post('/api/products/')
        .send({})
        .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTc1NTkyYjY2YzJlMTY4YmNkMjNiMiIsImlhdCI6MTYyMDUzNzIyMCwiZXhwIjoxNjIzMTI5MjIwfQ.IvBDslN1-DmvsVIsgc7YLlMviHya5tGV1ekbCzOnNw8')  
        .end(function(err,res){
            id = res.body._id
            expect(res).to.have.status(201);
            done();
    });
    });

    it('Should update a product', (done) =>{
        chai.request(url)
        .put('/api/products/'+id)
        .send(product)
        .set({'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTc1NTkyYjY2YzJlMTY4YmNkMjNiMiIsImlhdCI6MTYyMDUzNzIyMCwiZXhwIjoxNjIzMTI5MjIwfQ.IvBDslN1-DmvsVIsgc7YLlMviHya5tGV1ekbCzOnNw8',
               'Content-Type': 'application/json'
    })
        .end(function(err,res){
            expect(res).to.have.status(200);
            done();
    });
    });

    it('Should delete a product', (done) =>{
        chai.request(url)
        .delete('/api/products/'+id)
        .send({})
        .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTc1NTkyYjY2YzJlMTY4YmNkMjNiMiIsImlhdCI6MTYyMDUzNzIyMCwiZXhwIjoxNjIzMTI5MjIwfQ.IvBDslN1-DmvsVIsgc7YLlMviHya5tGV1ekbCzOnNw8')  
        .end(function(err,res){
            expect(res.body.message).to.be.equal('Product removed');
            done();
    });
    });

})