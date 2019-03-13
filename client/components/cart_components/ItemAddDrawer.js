import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CartItem from './CartItem';
import { createOrder } from '../../reducers/orderReducer';

const drawerWidth = 450
const styles = theme => ({
  drawer: {
    width: drawerWidth,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: "rgb(216, 216, 216)",    
  },
  drawerInfoContainer: {
    backgroundColor: 'white',
  },
  header: {
      fontSize: '2em',
      height: '70px',
      width: '100%',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white'
  },
})

const StyledButton = withStyles({
    root: {
      background: 'lightslategrey',
      borderRadius: 3,
      height: 48,
      color: 'white',
    },
  })(Button);

class ItemAddDrawer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { 
        classes, 
        drawerOpen,  
        order, 
        handleClickAway, 
        subTotal,
        tax,
        total,
        createOrder 
    } = this.props;
  	return (
  	  <div>
          <Drawer 
            variant="temporary"
            anchor='right'
            open={drawerOpen}
            onClose={handleClickAway}>
            <div className={classes.drawer}>
                <div className={classes.drawerInfoContainer}>
                    <div className={classes.header}>Your Cart</div>
                    <hr className={classes.hr}/>
                    {order.Item.map(item => {
                        return (
                            <CartItem 
                                key={item.id}
                                item={item} 
                                order={order}/>
                        )
                    })}
                </div>
                <div className="totalAndCheckoutContainer">
                    <div className="totalSummary">
                        <div>Subtotal</div>
                        <div>${subTotal}</div>
                    </div>
                    <div className="totalSummary">
                        <div>Tax</div>
                        <div>${tax}</div>
                    </div>
                    <div className="totalSummary">
                        <div>Shipping</div>
                        <div>$3.99</div>
                    </div>
                    <div className="totalSummary">
                        <div>Total</div>
                        <div>${total}</div>
                    </div>
                    <div className="checkoutButtonContainer">
                        <StyledButton 
                            className="checkoutButton" 
                            component={Link}
                            to="/cart">Checkout</StyledButton>
                    </div>
                </div>
            </div>
  	    </Drawer>
  	  </div>
  	)
  }
}

ItemAddDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state, { order }) => {
    // order total logic atm until we can get sequelize validation hook for order total
    // by reducing all item costs to order.total to work
    let subTotal = parseFloat(order.Item.reduce((total, item) => {
        return total += item.cost*1
    }, 0)).toFixed(2)
    let tax = parseFloat(subTotal*1*0.045).toFixed(2)
    let total = (parseFloat(subTotal) + parseFloat(tax) + parseFloat(3.99)).toFixed(2)
    return {
      subTotal,
      tax,
      total,
      order
    };
  };

const mapDispatchToProps = dispatch => ({
    createOrder: order => dispatch(createOrder(order)),
});
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ItemAddDrawer));