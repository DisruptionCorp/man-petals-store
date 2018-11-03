const Product = require('../models/Product');
const Order = require('../models/Order');
const LineItem = require('../models/LineItem');
const User = require('../models/User');
const Review = require('../models/Review');
const fs = require('fs');
const path = require('path');

const seed = async () => {
    //Create Seed Users

    try {
        //Build bulk user list
        const _users = [
            { name: 'kevin', email: 'k@gmail.com', password: 'KEVIN', admin: true },
            { name: 'daniel', email: 'd@gmail.com', password: 'DANIEL', admin: true },
            { name: 'andrew', email: 'a@gmail.com', password: 'ANDREW', admin: true },
            { name: 'sanjai', email: 's@gmail.com', password: 'SANJAI', admin: true },
            { name: 'moe', email: 'm@gmail.com', password: 'MOE' },
            { name: 'larry', email: 'l@gmail.com', password: 'LARRY' },
            { name: 'curly', email: 'c@gmail.com', password: 'CURLY' }
        ]
        const users = await User.bulkCreate(_users);

        //Import product bulk list
        const productData = fs.readFileSync(path.join(__dirname, 'PRODUCT_MOCK_DATA.json'));
        const _products = JSON.parse(productData);
        
        //Convert Tags from string to array to match Product.js model
        _products.forEach(product => product.tags = [ product.tags ]);
        const products = await Product.bulkCreate(_products);

        //Import review product list
        const reviewData = fs.readFileSync(path.join(__dirname, 'REVIEW_MOCK_DATA.json'));
        const _review = JSON.parse(reviewData);


        //Create bulk reviews
        async function createReviews() {
            const randomReview = () => _review[Math.floor(Math.random() * _review.length)];
            try {
                for (product in products) {
                    const numberOfReviews = Math.floor(Math.random() * 3);
                    // console.log('product id of review is: ', products[product].id)

                    for (i = 0; i < numberOfReviews; i++){
                        const review = randomReview();
                        const randomUserId = users[Math.floor(Math.random() * users.length)].id;
                        await Review.create({ ...review, productId: products[product].id, userId: randomUserId });          
                    }
                }
            }
            catch(err) {console.log('error occured ', err)}
        }
        createReviews();
        
        //Build bulk order list
        const _orders = [
            { status: 'ORDER', userId: users[0].id },
            { status: 'ORDER', userId: users[1].id },
            { status: 'CART', userId: users[2].id }
        ]
        const orders = await Order.bulkCreate(_orders);

        //Build bulk lineItems list
        const _lineItems = [
            { orderId: orders[0].id, productId: products[Math.floor(Math.random() * products.length)].id },
            { orderId: orders[1].id, productId: products[Math.floor(Math.random() * products.length)].id },
            { orderId: orders[1].id, productId: products[Math.floor(Math.random() * products.length)].id },
            { orderId: orders[1].id, productId: products[Math.floor(Math.random() * products.length)].id }
        ]
        const lineItems = await LineItem.bulkCreate(_lineItems);

    }
    catch(err) {
        console.log('error durring seed execution: ', err)
    }
  };

  module.exports = seed;