
require('dotenv').config()

const chai = require("chai");
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
let apiKey = process.env.API_KEY
var app = "http://localhost:3000";
let expect = chai.expect;

describe('testcases for login api', function () {
    it('should throw error - Incorrect password', (done) => {
        var apiUrl = '/api/v1/user/login'

        let obj = {
            "email": "msukeerthi1@gmail.com",
            "password": "U2FsdGVkX1/KYM9Zaz/5s7XAuJyWc/SRyKLsJCsQAnk="
        }

        chai.request(app).post(apiUrl).set({ "x-api-key": apiKey, Accept: 'application/json' }).send(obj).end(function (err, response) {

            response.should.have.status(200);
            response.body.success.should.equal(false);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.err.should.equal('Incorrect Password')
        })
        done()
    })
    it('should throw error - email not exists', (done) => {
        // this.timeout(50000)
        var apiUrl = '/api/v1/user/login'

        let obj = {
            "email": "msukeerthi11@gmail.com",
            "password": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM="
        }

        chai.request(app).post(apiUrl).set({ "x-api-key": apiKey, Accept: 'application/json' }).send(obj).end(function (err, response) {

            response.should.have.status(200);
            response.body.success.should.equal(false);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.err.should.equal('Requested email is not registered')
        })
        done()
    })
    it('should validate req obj', (done) => {
        var apiUrl = '/api/v1/user/login'

        let obj = {
            "email": "msukeerthi11@gmail.com"
        }

        chai.request(app).post(apiUrl).set({ "x-api-key": apiKey, Accept: 'application/json' }).send(obj).end(function (err, response) {

            response.should.have.status(200);
            response.body.success.should.equal(false);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.err.should.equal("\"password\" is required")
        })
        done()
    })
    it('should return success response', (done) => {
        var apiUrl = '/api/v1/user/login'

        let obj = { 
            "email": "msukeerthi1@gmail.com",
            "password": "U2FsdGVkX19xTQVHcP/z1QCbgdeUIixI8PujAYSyBRM="
         }
         

        chai.request(app).post(apiUrl).set({ "x-api-key": apiKey, Accept: 'application/json' }).send(obj).end(function (err, response) {

            response.should.have.status(200);
            response.body.success.should.equal(true);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.message.should.equal("success");
            response.body.data.should.have.property("accessToken");
        })
        done()
    })
})
