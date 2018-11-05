import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createOrder } from '../reducers/orderReducer';
import { getProductsByPage } from '../reducers/productReducer';
import {
  Grid,
  Icon,
  Button,
  SvgIcon,
  CircularProgress,
  Typography,
} from '@material-ui/core';

//presentation components
import ProductCard from './products_components/ProductCard';

class Products extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }
  componentDidMount() {
    const { idx, getProductsByPage } = this.props;
    getProductsByPage(idx);
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentDidUpdate(prev) {
    const { idx, getProductsByPage } = this.props;
    if (idx != prev.idx) {
      getProductsByPage(idx);
    }
  }

  render() {
    const {
      allProducts,
      pageProducts,
      order,
      count,
      createOrder,
      idx,
      totalPages,
    } = this.props;
    const id = order ? order.id : '';

    return this.state.loading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <CircularProgress />
      </div>
    ) : (
      <div className="cartContainer">
        {/*<div>
          Your Order ID is ({id}
          ).
        </div>
        <div>Your cart contains {count} items.</div>*/}
        <hr />
        <div className="container">
          <h2>Products</h2>
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                disabled={idx < 2}
                component={Link}
                to={`/products/page/${idx - 1}`}
              >
                <Icon>arrow_back</Icon>
              </Button>
              <Button
                disabled={idx >= totalPages}
                component={Link}
                to={`/products/page/${idx + 1}`}
              >
                <Icon>arrow_forward</Icon>
              </Button>
            </div>
          </div>
          <div className="row">
            {pageProducts.map(_product => {
              return (
                <ProductCard
                  key={_product.id}
                  product={_product}
                  order={order}
                  className="col-sm-3 border rounded p-3"
                />
              );
            })}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={!count}
            onClick={() => createOrder(order)}
            component={Link}
            to="/orders"
          >
            <Icon>shopping-cart-plus</Icon>
            {' CREATE'}
          </Button>
          <div>
            <div style={{ display: 'flex', justifyContent: 'row' }}>
              {idx > 2 && (
                <Button component={Link} to="/products/page/1">
                  1
                </Button>
              )}
              {idx > 1 && <Typography>..</Typography>}
              {idx > 1 && (
                <Button component={Link} to={`/products/page/${idx - 1}`}>
                  {idx - 1}
                </Button>
              )}
              <Button>{idx}</Button>
              {idx + 1 < totalPages && (
                <Button component={Link} to={`/products/page/${idx + 1}`}>
                  {idx + 1}
                </Button>
              )}
              {idx < totalPages && <Typography>..</Typography>}
              {idx !== totalPages && (
                <Button component={Link} to={`/products/page/${totalPages}`}>
                  {totalPages}
                </Button>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body1">
                Page {idx} of {totalPages}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, orders }, { idx }) => {
  const { allProducts, pageProducts } = products;
  const order = orders.find(_order => _order.status === 'CART');
  const items = order ? order.Item : [];
  const count = items.reduce((acc, el) => {
    return (acc += el.quantity);
  }, 0);

  return {
    allProducts,
    pageProducts: pageProducts.rows,
    totalPages: Math.ceil(pageProducts.count / 12),
    order,
    idx,
    count,
  };
};

const mapDispatchToProps = dispatch => ({
  getProductsByPage: idx => dispatch(getProductsByPage(idx)),
  createOrder: order => dispatch(createOrder(order)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
