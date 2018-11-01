import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  incrementLineItem,
  decrementLineItem,
  createOrder,
} from '../reducers/orderReducer';
import { Grid, Icon, Button } from '@material-ui/core';

//presentation components
import ProductCard from './products_components/ProductCard';

class Products extends Component {
  render() {
    const { products, order, createOrder } = this.props;
    const id = order ? order.id : '';
    const items = order ? order.Item : [];
    const count = items.reduce((acc, el) => {
      return (acc += el.quantity);
    }, 0);
    return (
      <div className="cartContainer">
        <div>
          Your Order ID is ({id}
          ).
        </div>
        <div>Your cart contains {count} items.</div>
        <hr />
        <div>
          <h2>Products</h2>
          {products.map(_product => {
            return (
              <Grid
                container
                spacing={24}
                direction="row"
                display="space-around"
                alignItems="center"
                style={{ display: 'flex' }}
                key={_product.id}
              >
                <ProductCard
                  key={_product.id}
                  product={_product}
                  order={order}
                />
              </Grid>
            );
          })}
        </div>
        <Button
          disabled={count == 0}
          onClick={() => createOrder(order)}
          component={Link}
          to="/orders"
        >
          <Icon>shopping-cart-plus</Icon>
          {' CREATE'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ products, orders }) => {
  const order = orders.find(_order => _order.status === 'CART');
  return {
    products,
    order,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleIncrement: (product, order) =>
      dispatch(incrementLineItem(product, order)),
    handleDecrement: (product, order) =>
      dispatch(decrementLineItem(product, order)),
    createOrder: order => dispatch(createOrder(order)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
