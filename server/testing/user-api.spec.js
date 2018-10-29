const supertest = require('supertest-as-promised')(require('../index'));
const expect = require('chai').expect;
const db = require('../../db');
const { sync, User, Order, Review } = db;
const app = require('../index');

describe('User Routes', () => {
  beforeEach(() => {
  	return sync();
  });

  describe('/api/users', () => {
  	it('/GET responds with 200 and all users, and includes reviews and orders', async () => {
  	  const [ andrew, daniel, sanjai ] = await Promise.all([
  	  	User.create({ name: 'andrew', email: 'a@gmail.com', password: '12345' }),
  	  	User.create({ name: 'daniel', email: 'd@gmail.com', password: '67890' }),
  	  	User.create({ name: 'sanjai', email: 's@gmail.com', password: 'abcde' })
  	  ]);
  	  const [ order1, order2 ] = await Promise.all([
  	  	Order.create({ userId: andrew.id }),
  	  	Order.create({ userId: sanjai.id })
  	  ]);
  	  const [ review1, review2 ] = await Promise.all([
  	  	Review.create({ content: 'a good review', userId: daniel.id }),
  	  	Review.create({ content: 'a bad review', userId: andrew.id })
  	  ])
  	  await supertest
  	  .get('/api/users')
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	const emails = res.body.reduce((a,c)=>{return [...a, c.email]}, []);
  	  	expect(res.body).to.have.lengthOf(3)
  	  	expect(emails).to.contain(daniel.email)
  	  	res.body.map((each, idx) => {
  	  	  expect(each.reviews).to.be.ok;
  	  	  expect(each.orders).to.be.ok;
  	  	  if(each.id === andrew.id){
  	  	  	expect(each.reviews).to.have.lengthOf(1);
  	  	  }
  	  	})
  	  });
  	});

  	it('/POST respond with 200, creates user, and returns created user', async () => {
  	  await supertest
  	  .post('/api/users')
  	  .send({ name: 'kevin', email: 'k@gmail.com', password: 'fghij'})
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	expect(res.body.name).to.equal('kevin');
  	  });
  	});
  });

  describe('/api/users/:id', () => {
  	it('/GET responds with 200 and returns user by id', async () => {
  	  const [ sam, leo, prof ] = await Promise.all([
  	  	User.create({ name: 'sam', email: 's@gmail.com', password: '12345' }),
  	  	User.create({ name: 'leo', email: 'l@gmail.com', password: '67890' }),
  	  	User.create({ name: 'prof', email: 'p@gmail.com', password: 'abcde' })
  	  ]);
  	  await supertest
  	  .get(`/api/users/${sam.id}`)
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	console.log(res.body)
  	  	expect(res.body.name).to.equal('sam')
  	  });
  	});

  	it('/DELETE responds with 404, deletes by id', async () => {
  	  const [ elliot, gabe ] = await Promise.all([
		User.create({ name: 'elliot', email: 'e@gmail.com', password: '12345' }),
  	  	User.create({ name: 'gabe', email: 'g@gmail.com', password: '67890' })
  	  ]);
  	  await supertest
  	  .delete(`/api/users/${elliot.id}`)
  	  .expect(404)
  	});

  	it('/PUT responds with 200, updates user, and return updated user', async () => {
  	  const [ elliot, gabe ] = await Promise.all([
		User.create({ name: 'elliot', email: 'e@gmail.com', password: '12345' }),
  	  	User.create({ name: 'gabe', email: 'g@gmail.com', password: '67890' })
  	  ]);
  	  await supertest
  	  .put(`/api/users/${gabe.id}`)
  	  .send({ name: 'eric', password: '54321' })
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .expect(res => {
  	  	expect(res.body.name).to.equal('eric')
  	  	expect(res.body.password).to.equal('54321')
  	  })
  	})
  })
});