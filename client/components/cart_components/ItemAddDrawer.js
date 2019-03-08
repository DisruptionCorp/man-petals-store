import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Icon, Typography } from '@material-ui/core';
import { incrementLineItem, decrementLineItem } from '../../reducers/orderReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 600
const styles = theme => ({
  drawer: {
    width: drawerWidth,
    
  },
})

class ItemAddDrawer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { classes, drawerOpen, product, itemQuantity, order, handleDec, handleInc } = this.props;
  	return (
  	  <div>
        {/* having some issues here with the clickaway listener constantly clicking away even when I'm clicking within the drawer */}
          <Drawer 
            variant="temporary"
            anchor='right'
            className={classes.drawer}
            open={drawerOpen}>
            <Typography variant="display1" color="textPrimary">
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
  
  const mapDispatchToProps = dispatch => {
    return {
      handleInc: (product, order) => {
        dispatch(incrementLineItem(product, order));
      },
      handleDec: (product, order) => {
        dispatch(decrementLineItem(product, order));
      },
    };
  };
  
  export default connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(ItemAddDrawer));