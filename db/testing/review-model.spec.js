const Sequelize = require('sequelize');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const { sync, Review, Product, User } = require('../index');
chai.use(chaiAsPromised);

describe('Review Model', () => {
  beforeEach(() => {
  	return sync();
  });

  it('content can be very long', async () => {
  	const review1 = await Review.create({ content: 'many words over and over, many words over and over, many words over and over, many words over and over, many words over and over, many words over and over,'});
  	expect(review1).to.be.ok;
  });

  it('belongs to one user', async () => {
  	const [ review2, user1 ] = await Promise.all([
  	  Review.create({ content: 'some content' }),
  	  User.create({ name: 'elliot', password: 'szwa', email: 'el@gmail.com' })
  	]);

  	await review2.setUser(user1);
  	const reviewList = await user1.getReviews().reduce((a, c)=>{return [...a, c.id]}, []);

  	expect(review2.userId).to.equal(user1.id);
  	expect(reviewList).to.include(review2.id);
  });

  it('belongs to one product', async () => {
  	const [ review3, product1 ] = await Promise.all([
  	  Review.create({ content: 'too expensive' }),
  	  Product.create({ name: 'Converse', price: 55.99 })
  	]);

  	await review3.setProduct(product1);
  	const reviewList = await product1.getReviews().reduce((a, c)=>{return [...a, c.id]}, []);

  	expect(review3.productId).to.equal(product1.id);
  	expect(reviewList).to.include(review3.id);
  });
})