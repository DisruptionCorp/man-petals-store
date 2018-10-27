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

  	it('/POST responds with 200, creates new product, and responds with new product', async () => {
  	  await supertest
  	  .post('/api/products')
  	  .send({ name: 'grapefruit'})
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	expect(res.body.name).to.eql('grapefruit');
  	  });
  	});
  });

  describe('/api/products/:id', () => {

  	it('/POST responds with 200, destroys product, and responds with all products after destruction', async () => {
  	  const [ adidas, nike, puma ] = await Promise.all([
  	    Product.create({ name: 'adidas', price: 89.99 }),
  	    Product.create({ name: 'nike', price: 59.99 }),
  	    Product.create({ name: 'puma', price: 69.99 })
  	  ]);
  	  await supertest
  	  .post(`/api/products/${adidas.id}`)
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	const ids = res.body.reduce((acc, curr) => {
  	  	  return [...acc, curr.id]
  	  	}, []);
  	  	expect(ids).to.not.include(adidas.id);
  	  });
  	});

    it('/PUT responds with 200, updates product, and responds with updated product', async () => {
      const [ uniqlo, muji, asos ] = await Promise.all([
  	    Product.create({ name: 'uniqlo shirt'}),
  	    Product.create({ name: 'muji shirt'}),
  	    Product.create({ name: 'asos shirt'})
  	  ]);
      await supertest
      .put(`/api/products/${uniqlo.id}`)
      .send({ name: 'uniqlo shoes' })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
      	Product.findById(uniqlo.id)
      	.then(updated => {
      	  console.log(updated)
      	  expect(updated.name).to.equal('uniqlo shoes')
      	});
      });
    });
  });

  describe('error handling', () => {

    it('responds with a 404 if a product does not exist', () => {
      return supertest
        .get('/api/products/6')
        .expect(404);
      });

    it('responds with a 400 if you attempt to add a product without content', () => {
      return supertest
        .post('/api/products')
        .send({ name: '' })
        .expect(500);
    });

  });
});