const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost:5432/pepTest', { logging: false });
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const expect = chai.expect;
chai.use(chaiAsPromised);


const Product = conn.define('product', {
  name: {
  	type: Sequelize.STRING,
  	unique: true
  },
  price: {
  	type: Sequelize.DECIMAL(10,2),
  }
},{ include: [Review] });


describe('Product Model', () => {
  beforeEach(() => {
    return Product.sync();
  });

  afterEach(() => {
  	return Product.truncate();
  });

  it('name is a type string', async () => {
  	const product = await Product.create({ name: 'Nike' });
  	expect(product.name).to.be.a('string');
  });

  it('name is unique', async () => {
  	const product1 = await Product.create({ name: 'Adidas' });
  	expect(Product.create({ name: 'Adidas' })).to.be.rejected;
  })

});



