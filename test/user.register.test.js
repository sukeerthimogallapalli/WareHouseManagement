
require('dotenv').config()

const chai = require("chai");
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
let apiKey=process.env.API_KEY
var app = "http://localhost:3000";

describe('testcases for registration api', function () {
    it('should throw error - user already exists', (done) => {
        // this.timeout(50000)
        var apiUrl = '/api/v1/user/register'

        let obj ={
            "firstName": "sukeerthi",
            "lastName": "M",
            "email": "msukeerthi1@gmail.com",
            "gender": "female",
            "password": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM=",
            "confirmPassword": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM="
         }
        chai.request(app).post(apiUrl).set({"x-api-key":apiKey, Accept: 'application/json' }).send(obj).end(function (err, response) {
            response.should.have.status(200);
            response.body.success.should.equal(false);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status')
        })
        done()
    })
    it('should throw validation error', (done) => {
        var apiUrl = '/api/v1/user/register'

        let obj ={
            "lastName": "M",
            "email": "msukeerthi1@gmail.com",
            "gender": "female",
            "password": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM=",
            "confirmPassword": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM="
         }
        chai.request(app).post(apiUrl).set({"x-api-key":apiKey, Accept: 'application/json' }).send(obj).end(function (err, response) {
            response.should.have.status(401);
            response.body.success.should.equal(false);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.err.should.equal("\"firstName\" is required")
        })
        done()
    })
    it('should throw pwd cpwd missmatch err', (done) => {
        var apiUrl = '/api/v1/user/register'

        let obj ={
            "firstName": "sukeerthi",

            "lastName": "M",
            "email": "msukeerthi1@gmail.com",
            "gender": "female",
            "password": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM=",
            "confirmPassword": "U2FsdGVkX1/KYM9Zaz/5s7XAuJyWc/SRyKLsJCsQAnk="
         }
        chai.request(app).post(apiUrl).set({"x-api-key":apiKey, Accept: 'application/json' }).send(obj).end(function (err, response) {
            response.should.have.status(401);
            response.body.success.should.equal(false);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.err.should.equal('"confirmPassword" must be [ref:password]')
        })
        done()
    })
    it('should validate api key', (done) => {
        var apiUrl = '/api/v1/user/register'

        let obj ={
            "firstName": "sukeerthi",
            "lastName": "M",
            "email": "msukeerthi1@gmail.com",
            "gender": "female",
            "password": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM=",
            "confirmPassword": "U2FsdGVkX1/KYM9Zaz/5s7XAuJyWc/SRyKLsJCsQAnk="
         }
        chai.request(app).post(apiUrl).set({ Accept: 'application/json' }).send(obj).end(function (err, response) {
            response.should.have.status(403);
            response.body.success.should.equal(false);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.err.should.equal('Unauthorized API key')
        })
        done()
    })
    it('should return success response', (done) => {
        var apiUrl = '/api/v1/user/register'

        let obj ={
            "firstName": "sukeerthi",
            "lastName": "M",
            "email": "msukeerthi21@gmail.com",
            "gender": "female",
            "password": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM=",
            "confirmPassword": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM="
         }
        chai.request(app).post(apiUrl).set({"x-api-key":apiKey, Accept: 'application/json' }).send(obj).end(function (err, response) {
            response.should.have.status(200);
            response.body.success.should.equal(true);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.message.should.equal('Registration is successful')
            response.body.data.should.be.a('object')
        })
        done()
    })
})