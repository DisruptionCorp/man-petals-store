const supertest = require('supertest-as-promised')(require('../index'))
const expect = require('chai').expect;
const db = require('../../db');
const { sync, Product, LineItem, Review } = db;
const app = require('../index');

describe('Product Route', () => {
  beforeEach(() => {
  	return sync({ force: true });
  });

  describe('/api/products/', () => {
  	
  	it('/GET responds with 200 and all products', async () => {
  	  const products = await Promise.all([
  	    Product.create({ name: 'apple', price: 0.59 }),
  	    Product.create({ name: 'banana', price: 0.39 }),
  	    Product.create({ name: 'orange', price: 0.69 })
  	  ]);
  	  await supertest
  	  .get('/api/products')
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	 	expect(res.body).to.have.lengthOf(3);
  	  });
  	});

  	it('/POST responds with 200, creates new task, and responds with new task', async () => {
  	  await supertest
  	  .post('/api/products')
  	  .send({ name: 'grapefruit'})
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	console.log(res.body)
  	  	expect(res.body.name).to.eql('grapefruit');
  	  });
  	});
  });

  describe('/api/products/:id', () => {

  	it('/POST responds with 200, destroys product, and responds with all products after destruction', async () => {
  	  
  	})
  });
});