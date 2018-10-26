const Sequelize = require('sequelize');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const { sync, User, Order } = require('../index');
chai.use(chaiAsPromised);

describe('User model', ()=> {
	beforeEach(()=> {
	  return User.sync({ force: true })
	});

    it('exists', ()=> {
        expect(User).to.be.ok
    });

    it('name is string', async ()=> {
      const [ andrew, sanjai ] = await Promise.all([
  	  User.create({ name: 'andrew', password: 'reis' }),
      User.create({ name: 'sanjai', password: 'syamaprasad' })
  	  ]);

  	  expect(typeof andrew.name).to.equal('string')
  	  expect(User.create({ name: ['daniel'] })).to.be.rejected;
  	  expect(typeof sanjai.name).to.equal('string')
    });

    it('name cannot be null', () => {
  	  expect(User.create({ password: 'reis' })).to.be.rejected;
      expect(User.create({ password: 'seeley' })).to.be.rejected;
    });

    it('password cannot be null', () => {
      expect(User.create({ name: 'seel' })).to.be.rejected;
      expect(User.create({ name: 'syamap' })).to.be.rejected;
    });

    it('email has to be email', async () => {
      const andy = await User.create({ name: 'andrew', 
      								   email:'andy@gmail.com', 
      								   password: 'reis' })

      expect(andy.email).to.be.ok;
      expect(User.create({ name: 'sanjai', 
      	                   email:'sanjygmail', 
      	                   password: 'syamaprasad' })).to.be.rejected;
    });

    it('has 1toM relationship w/ Order', async () => {
      const kevo = await User.create({ name: 'kevin', 
      					 email: 'kev@gmail.com', 
      					 password: 'hu' });
      const order1 = await Order.create();
      const order2 = await Order.create();
      order1.setUser(kevo);
      order2.setUser(kevo);
      
      expect(order1.userId).to.equal(kevo.id);
      expect(order2.userId).to.equal(kevo.id);
    })
})