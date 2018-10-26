const Sequelize = require('sequelize');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const { sync, Product, LineItem } = require('../index');
chai.use(chaiAsPromised);

describe('Product Model', () => {
  beforeEach(() => {
  	return Product.sync({ force: true });
  });

  it('name is string', async () => {
  	const [ shoe, socks ] = await Promise.all([
  		Product.create({ name: 'Adidas NMD' }),
  		Product.create({ name: 'Patagonia Hiking Socks' })
  		]);
  	expect(typeof shoe.name).to.equal('string')
  	expect(Product.create({ name: 5 })).to.be.rejected;
  	expect(typeof socks.name).to.equal('string')
  });

  it('name is unique', async ()=> {
  	const [ nike1, adidas ] = await Promise.all([
  	  Product.create({ name: 'Nike' }),
  	  Product.create({ name: 'Adidas' })
  	]);
  	expect(nike1).to.be.ok;
  	expect(adidas).to.be.ok;
  	expect(Product.create({ name: 'Nike' })).to.be.rejected;
  });

  it('name cannot be empty', () => {
  	expect(Product.create({ name: '' })).to.be.rejected;
  });

  it('description is text',  () => {
  	expect(Product.create({ name: 'Banana', description: 'lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text,' })).to.be.ok;
   	expect(Product.create({ name: 'Apple', description: true })).to.be.rejected;
  });
  
  it('inventory quantity is a number', async () => {
  	const cbj = await Product.create({ name: 'Chicago Bulls Jersey', inv_quantity: 30 });

  	expect(typeof cbj.inv_quantity).to.equal('number');
   	expect(Product.create({ name: 'Lakers Jersey', inv_quantity: false })).to.be.rejected;
  });

    
  it('price is docked to second decimal after validation', async () => {
  	const coffee = await Product.build({ name: 'Coffee', price: 2.5 });
  	expect(typeof coffee.price).to.equal('number');
  	expect(coffee.price).to.equal(2.5);

  	await coffee.save();
  	expect(coffee.price).to.equal('2.50');
   	expect(Product.create({ name: 'Lakers Jersey', inv_quantity: false })).to.be.rejected;
  });

  it('product has many lineitems', async () => {
  	const espresso = await Product.create({ name: 'Espresso'});
  	const item1 = await LineItem.create();
  	item1.setProduct(espresso)

  	expect(item1.productId).to.equal(espresso.id);
  });
}) 