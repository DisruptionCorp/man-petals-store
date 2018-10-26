const Sequelize = require('sequelize');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const { sync, Order, User, LineItem } = require('../index');
chai.use(chaiAsPromised);

describe('Order Model', () => {
  beforeEach(() => {
  	return sync();
  });

  it('exists', () => {
  	expect(Order).to.be.ok;
  });

  it('has unique id', async () => {
  	const [ order1, order2 ] = await Promise.all([
  	  Order.create(),
  	  Order.create(),
  	]);

  	expect(order1.id).to.not.equal(order2.id);
  });

  it('defaults status to "CART" unless set otherwise', async () => {
  	const [ order3, order4 ] = await Promise.all([
  	  Order.create(),
  	  Order.create(),
  	]);

  	expect(order3.status).to.equal('CART');
  	expect(order4.status).to.equal('CART');

  	await order4.update({ status: 'ORDER' })

  	expect(order4.status).to.equal('ORDER');
  });

  it('can have many lineitems', async () => {
  	const [ order5, lineitem1, lineitem2 ] = await Promise.all([
  	  Order.create(),
  	  LineItem.create(),
  	  LineItem.create()
  	]);

  	await lineitem1.setOrder(order5);
  	await lineitem2.setOrder(order5);
  	await order5.setItem([ lineitem1, lineitem2 ]);

  	const query = await Order.findOne({include: { model: LineItem, as: 'Item' } }, {where: { id: order5.id }})
  	console.log(query)
  	expect(query.Item).to.be.ok;
  	expect(query.Item.length).to.equal(2);
  	expect(lineitem1.orderId).to.equal(order5.id);
  	expect(lineitem2.orderId).to.equal(order5.id);
  });

  it('has one user', async () => {
  	const [ order6, user1 ] = await Promise.all([
  	  Order.create(),
  	  User.create({ name: 'prof', password: 'eric', email: 'katz@gmail.com'})
  	]);

  	await order6.setUser(user1);
  	const userOrders = await user1.getOrders().reduce((acc,curr)=>{return [...acc, curr.id]}, []);

  	expect(order6.userId).to.equal(user1.id);
  	expect(userOrders).to.include(order6.id);
  })
  /*it('calculates order according to lineItems price*quantity', () => {
  	  	const [ order5, lineitem1, lineitem2 ] = await Promise.all([
  	  Order.create(),
  	  LineItem.create(),
  	  LineItem.create()
  	]);
  });*/
});

