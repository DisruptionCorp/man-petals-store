import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsByPage } from '../reducers/productReducer';
import {
  Grid,
  SvgIcon,
  CircularProgress,
} from '@material-ui/core';

//presentation components
import ProductCard from './products_components/ProductCard';
import ArrowNavigation from './pagination_components/ArrowNavigation';
import PageNavigation from './pagination_components/PageNavigation';

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
      idx,
      totalPages,
    } = this.props;
    const id = order ? order.id : '';

    return this.state.loading ? (
      <div className="allProductsContainer">
        <CircularProgress />
      </div>
    ) : (
      <div className="cartContainer">
        <hr />
        <div className="container">
          {/* <h2>Products</h2> */}
          <div>
            <ArrowNavigation idx={idx} totalPages={totalPages}/>
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
        <PageNavigation idx={idx} totalPages={totalPages} count={count}/>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
