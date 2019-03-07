import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';

class OrderConfirmation extends Component {

  render() {
  	const { total } = this.props;
  	return (
  	  <div>
  	    <form action="/api/stripe/charge" method="POST">
		  <script
		    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
		    data-key="pk_test_lWACQb7URwiEVS6EHfUAuqwS"
		    data-amount={total}
		    data-name="ManPetals"
		    data-description="Example charge"
		    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
		    data-locale="auto">
		  </script>
		  
		</form>
  	  </div>
  	)
  }
}

const mapStateToProps = (state, {total}) => ({total})

export default connect(mapStateToProps)(OrderConfirmation);