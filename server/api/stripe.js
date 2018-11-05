const stripe = require('stripe')('sk_test_vBcWIbxTxE2fkZaH6wLCOOPW'); // switch to publishable test key on deployment 'pk_test_lWACQb7URwiEVS6EHfUAuqwS'
const express = require('express');
const router = express.Router();
module.exports = router;

//err handling function
const cardError = (err, charge) => {
  switch(err.type){
  	case 'StripeCardError':
  	  err.message = 'Your card has been declined';
  	  return err.message;
  	//   case 'RateLimitError':
	  //   // Too many requests made to the API too quickly
	  //   break;
	  // case 'StripeInvalidRequestError':
	  //   // Invalid parameters were supplied to Stripe's API
	  //   break;
	  // case 'StripeAPIError':
	  //   // An error occurred internally with Stripe's API
	  //   break;
	  // case 'StripeConnectionError':
	  //   // Some kind of error occurred during the HTTPS communication
	  //   break;
	  // case 'StripeAuthenticationError':
	  //   // You probably used an incorrect API key
	  //   break;
	  default:
	    console.log('do not know this error')
	    break;
  }
}

router.get('/', (req, res, next) => {
  res.render('index', {

  });
});

router.get('/paysuccess', (req, res, next) => {
  res.render('paysuccess', {

  });
});

router.post('/charge', (req, res, next) => {
  const { stripeToken, amount, orderID, currency } = req.body;
  const charge = stripe.charges.create({
  	amount,
  	currency,
  	source: stripeToken,
  	capture: true,
  	metadata: { orderID },
  }, (err)=>{ err.type=== 'StripeCardError' ? console.log('there was an error') : 'another error'});
  console.log('pay was successful');
  res.redirect('/api/orders');
})
