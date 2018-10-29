const supertest = require('supertest-as-promised')(require('../index'));
const expect = require('chai').expect;
const db = require('../../db');
const { sync, Order, LineItem, Product, User } = db;
const app = require('../index')

describe('Order Routes', () => {
  beforeEach(() => {
  	return sync();
  })

  describe('/api/orders/', () => {
  	
  	it('/GET responds with 200 and all orders', async () => {
  	  const orders = await Promise.all([
  	    Order.create({ name: 'apple', price: 0.59 }),
  	    Order.create({ name: 'banana', price: 0.39 }),
  	    Order.create({ name: 'orange', price: 0.69 })
  	  ]);
  	  await supertest
  	  .get('/api/orders')
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	 	expect(res.body).to.have.lengthOf(3);
  	  })
  	})

  	it('/GET can include many lineitems and one user', async () => {
  	  const [ shoe, shirt, andrew, daniel, sanjai ] = await Promise.all([
  	  	Product.create({ name: 'shoe' }),
  	  	Product.create({ name: 'shirt' }),
  	  	User.create({ name: 'andrew', email:'a@gmail.com', password: 'reis' }),
  	  	User.create({ name: 'daniel', email:'d@gmail.com', password: 'seeley' }),
  	  	User.create({ name: 'sanjai', email:'s@gmail.com', password: 'syama' })
  	  ])

  	  const [ order1, order2 ] = await Promise.all([
  	  	Order.create({ userId: andrew.id }),
  	  	Order.create({ userId: daniel.id })
  	  ])

  	  const [ lineItem1, lineItem2, lineItem3, lineItem4 ] = await Promise.all([
  	  	LineItem.create({ productId: shoe.id, orderId: order1.id }),
  	  	LineItem.create({ productId: shoe.id, orderId: order2.id }),
  	  	LineItem.create({ productId: shirt.id, orderId: order2.id })
  	  ])
  	  await supertest
  	  .get('/api/orders')
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	expect(res.body).to.have.lengthOf(2);
  	  	expect(res.body[1].userId).to.equal(daniel.id);
  	  	expect(res.body[1].Item).to.have.lengthOf(2);
  	  })
  	})

  	it('/POST responds with 200, creates new order, and responds with new order', async () => {
  	  await supertest
  	  .post('/api/orders')
  	  .send({ total: 100.53 })
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	expect(res.body.total).to.equal('100.53');
  	  });
  	});

  describe('/api/orders/:id', () => {

  	it('/POST responds with 200, destroys order, and responds with all orders after destruction', async () => {
  	  const [ order3, order4, order5 ] = await Promise.all([
  	    Order.create({ total: 89.99 }),
  	    Order.create({ total: 59.99 }),
  	    Order.create({ total: 69.99 })
  	  ]);
  	  await supertest
  	  .post(`/api/orders/${order4.id}`)
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	const ids = res.body.reduce((acc, curr) => {
  	  	  return [...acc, curr.id]
  	  	}, []);
  	  	expect(ids).to.not.contain(order4.id);
  	  });
  	});

    it('/PUT responds with 200, updates order, and responds with updated order', async () => {
  	  const [ order6, order7, order8 ] = await Promise.all([
  	    Order.create({ total: 140.99 }),
  	    Order.create({ total: 150.99 }),
  	    Order.create({ total: 49.99 })
  	  ]);
      await supertest
      .put(`/api/orders/${order7.id}`)
      .send({ total: 154.75 })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
      	  console.log(res)
      	  expect(res.body.total).to.equal('154.75')

      });
    });
  });
});

  describe('error handling', () => {

    it('responds with a 404 if a product does not exist', () => {
      return supertest
        .get('/api/products/6')
        .expect(404)
      });

    it('responds with a 400 if you attempt to add a product without content', () => {
      return supertest
        .post('/api/products')
        .send({ name: '' })
        .expect(500)
    });

  })
});


