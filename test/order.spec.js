import express from 'express'
import chai from 'chai';
import chaiHttp from 'chai-http'
const expect = chai.expect;

chai.use(chaiHttp)
const url = 'http://EC2Co-EcsEl-PJTMJ8PS8AWM-1718674474.us-east-2.elb.amazonaws.com:5000'

const order = {
    _id: "609866e42035f461re8179b",
    totalPrice: 200,
    isPaid:false,
    isDelivered:false,
    orderItems:[{_id:"609866e32035f3461ce9179c",
    product:"60978f66311b5c377c7dfdd7",
    name:"Mbappe Toty",
    image:"https://i.ytimg.com/vi/3ASKG-Xv57A/maxresdefault.jpg",
    price:200,
    qty:1 }],
    user:"60975592b66c2e168bcd23b2",
    originInfo:{account:"kevdam10@gmail.com",password:"kevin123",securityCode:"sdfs123121"},
    createdAt:1620600547845,
    updatedAt:1620604061452,
    __v:0,
}

const updateOrder = {
    id:"9J591839TC5725721",
    status:"COMPLETED",
    update_time:"2021-05-09T23:47:40Z",
    payer :{ email_address:"sb-47vw5n5992061@personal.example.com"}
}

var id = ''

describe("ORDER TEST", ()=>{    

    it('Should get all orders', (done) =>{
        chai.request(url)
        .get('/api/orders')
        .send(order)
        .set({'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTc1NTkyYjY2YzJlMTY4YmNkMjNiMiIsImlhdCI6MTYyMDUzNzIyMCwiZXhwIjoxNjIzMTI5MjIwfQ.IvBDslN1-DmvsVIsgc7YLlMviHya5tGV1ekbCzOnNw8',
               'Content-Type': 'application/json'
    })
        .end(function(err,res){
            expect(res).to.have.status(200);
            done();
    });
    });

    it('Should create an order', (done) =>{
        chai.request(url)
        .post('/api/orders')
        .send(order)
        .set({'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTc1NTkyYjY2YzJlMTY4YmNkMjNiMiIsImlhdCI6MTYyMDUzNzIyMCwiZXhwIjoxNjIzMTI5MjIwfQ.IvBDslN1-DmvsVIsgc7YLlMviHya5tGV1ekbCzOnNw8',
               'Content-Type': 'application/json'
    })
        .end(function(err,res){
            id = res.body._id
            expect(res).to.have.status(201);
            done();
    });
    });

    it('Should update a order to paid', (done) =>{
        chai.request(url)
        .put('/api/orders/'+id+'/pay')
        .send(updateOrder)
        .set({'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTc1NTkyYjY2YzJlMTY4YmNkMjNiMiIsImlhdCI6MTYyMDUzNzIyMCwiZXhwIjoxNjIzMTI5MjIwfQ.IvBDslN1-DmvsVIsgc7YLlMviHya5tGV1ekbCzOnNw8',
               'Content-Type': 'application/json'
    })
        .end(function(err,res){
            expect(res).to.have.status(200);
            done();
    });
    });

    it('Should update a order to delivered', (done) =>{
        chai.request(url)
        .put('/api/orders/'+id+'/deliver')
        .send({})
        .set({'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTc1NTkyYjY2YzJlMTY4YmNkMjNiMiIsImlhdCI6MTYyMDUzNzIyMCwiZXhwIjoxNjIzMTI5MjIwfQ.IvBDslN1-DmvsVIsgc7YLlMviHya5tGV1ekbCzOnNw8'
            })
        .end(function(err,res){
            expect(res).to.have.status(200);
            done();
    });
    });
    
})