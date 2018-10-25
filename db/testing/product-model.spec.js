const Sequelize = require('sequelize');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const Product = require('../models/Product');
const { sync } = require('../index');
chai.use(chaiAsPromised);

describe('Product Model', () => {
  beforeEach(() => {
  	return Product.sync();
  });

  it('name is string', () => {
  	const [ shoe, shirt, socks ] = Promise.all([
  		Product.create({ name: 'Adidas NMD' }),
  		Product.create({ name: 5 }),
  		Product.create({ name: 'Patagonia Hiking Socks' })
  		]);
  	expect(typeof shoe.name).to.equal('string')
  	expect(shirt).to.be.rejected;
  	expect(typeof socks.name).to.equal('string')
  });

  it('name is unique', ()=> {
  	const [ nike1, nike2, adidas ] = Promise.all([
  	  Product.create({ name: 'Nike' }),
  	  Product.create({ name: 'Nike' }),
  	  Product.create({ name: 'Adidas' })
  	]);
  	expect(nike1).to.be.ok;
  	expect(nike2).to.be.rejected;
  	expect(adidas).to.be.ok;
  });

  it('name cannot be empty', async () => {
  	const someProduct = await Product.create({ name: '' })
  	expect(someProduct).to.be.rejected;
  })
}) 