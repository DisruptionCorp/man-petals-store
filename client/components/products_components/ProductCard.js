import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductDetail from './ProductDetail';
import {
  incrementLineItem,
  decrementLineItem,
} from '../../reducers/orderReducer';
import {
  Grid,
  Paper,
  Typography,
  Button,
  ButtonBase,
  Icon,
} from '@material-ui/core';

class ProductCard extends Component {
  render() {
    const { product, order, itemQuantity, handleInc, handleDec, i } = this.props;

    return (
      <div className="productGridItem">
      
        <img src={product.photo} className="animated fadeInUpBig productCardImg materialboxed"/>
        {/* <Paper className="productContainer">
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
        </Paper> */}
      </div>
    );
  }
}

const mapStateToProps = (state, { order, product }) => {
  let item = order
    ? order.Item.find(item => item.productId === product.id)
    : null;
  return {
    order,
    product,
    itemQuantity: item ? item.quantity : 0,
  };
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
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);
