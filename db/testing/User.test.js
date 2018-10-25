const chai = require('chai');
const expect = chai.expect;

const { db, User } = require("../models/User.js");

describe('temp db', ()=> {
    it('exists', ()=> {
        expect(db).to.be.ok
    });
    it('has one model named user', ()=> {
        expect(User).to.be.ok;
        // expect(User.find).to.be.ok;
    });
})