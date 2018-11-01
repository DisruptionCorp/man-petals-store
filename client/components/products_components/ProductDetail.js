import React, { Component } from 'react';
import ProductReview from './ProductReview';
import {
  Grid,
  Paper,
  Typography,
  Button,
  ButtonBase,
  Icon,
} from '@material-ui/core';

import { connect } from 'react-redux';
import {
  incrementLineItem,
  decrementLineItem,
} from '../../reducers/orderReducer';

class ProductDetail extends Component {
  render() {
    console.log(this.props.location.state);
    const { order, product } = this.props.location.state;
    const { handleInc, handleDec, itemQuantity } = this.props;

    const disable = itemQuantity === 0;
    //defensive code to deal with products not having loaded yet
    if (!product) return null;
    const {
      name,
      description,
      photo,
      tags,
      reviews,
      inv_quantity,
      price,
    } = product;
    let stockRemaining = 'In Stock';
    if (inv_quantity < 10) stockRemaining = 'Limited Stock!';
    if (inv_quantity === 0) stockRemaining = 'Sold Out';
    return (
      <div>
        <img src={photo} alt={name} height="400" width="400" />
        <br />
        <h5>Product Info:</h5>
        <ul>
          <li>{name}</li>
          <li>{description}</li>
          <li>Price: ${price}</li>
          <li>{stockRemaining}</li>
          <li>Tags: {tags ? tags.join(', ') : ''}</li>
        </ul>
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
            variant="fab"
            color="secondary"
            onClick={() => handleDec(product, order)}
          >
            <Icon>remove</Icon>
          </Button>
        </div>
        <h5>Reviews:</h5>
        {reviews.map(review => {
          return <ProductReview review={review} key={review.id} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { order, product } = ownProps.location.state;
  console.log(order, product);
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
)(ProductDetail);
