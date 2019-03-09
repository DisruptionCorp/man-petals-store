import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Icon, Typography } from '@material-ui/core';
import { incrementLineItem, decrementLineItem } from '../../reducers/orderReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CartItem from './CartItem';

const drawerWidth = 450
const styles = theme => ({
  drawer: {
    width: drawerWidth,
    padding: '10px',    
  },
  header: {
      display: 'flex',
      justifyContent: 'center',
  }
})

class ItemAddDrawer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { 
        classes, 
        drawerOpen, 
        product, 
        itemQuantity, 
        order, 
        handleClickAway 
    } = this.props;
    console.log(order)
  	return (
  	  <div>
          <Drawer 
            variant="temporary"
            anchor='right'
            open={drawerOpen}
            onClose={handleClickAway}>
            <div className={classes.drawer}>
                <h4 className={classes.header}>Your Cart</h4>
                <hr />
            {order.Item.map(item => {
                return (
                    <CartItem item={item} order={order} product={product} />
                )
            })}
            {/* <Typography variant="display1" color="textPrimary">
                <Link to={`/products/${product.id}`} className="productNameLink">{product.name}</Link>
            </Typography>
            <Typography variant="body1">
                Price: {product.price ? `$${product.price}` : 'tbd'}
            </Typography>
            <Typography variant="body1">{itemQuantity} units in cart</Typography>
            <div className="buttonContainer">
                <Button
                    variant="fab"
                    color="primary"
                    onClick={() => handleInc(product, order)}
                >
                    <Icon>add</Icon>
                </Button>
                <Button
                    disabled={!itemQuantity}
                    variant="fab"
                    color="secondary"
                    onClick={() => handleDec(product, order)}
                >
                    <Icon>remove</Icon>
                </Button>
            </div> */}
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

const mapStateToProps = (state, { order, product }) => {
    let item = order
    ? order.Item.find(item => item.productId === product.id)
    : null;
    return {
      order,
      itemQuantity: item ? item.quantity : 0,
      product
    };
  };

  
  export default connect(
    mapStateToProps
  )(withStyles(styles)(ItemAddDrawer));