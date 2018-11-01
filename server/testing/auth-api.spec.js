const expect = require('chai').expect;
const db = require('../../db');
const app = require('supertest')(require('../index'));
const jwt = require('jwt-simple');
const { sync, User, Order, Review } = db;

console.log(app.get('/'))

describe('authenticate', ()=> {
    // beforeEach(()=> {
    //     db.sync()
    //     .then(()=> {
    //         db.seed()})
    // });

    it('POST requests with valid credentials returns a 200 status and token', ()=> {
        return app.post('/api/auth').send({ email: 'k@gmail.com', password: 'KEVIN' })
            .expect(200)
            .then(response => {
                const token = response.body.token;
                console.log(token)
                expect(token).to.be.ok;
                return app.get('/api/auth')
                    .set('authorization', token)
                    .expect(200);
            })
    })

    it('GET requests with token returns a 200 status and user', ()=> {
        return app.get('/api/auth').set('authorization', token)

    })

})