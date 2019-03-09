import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsByPage } from '../reducers/productReducer';
import { incrementLineItem } from '../reducers/orderReducer';

import {
  ClickAwayListener, 
  CircularProgress,
} from '@material-ui/core';

//presentation components
import ProductCard from './products_components/ProductCard';
import ArrowNavigation from './pagination_components/ArrowNavigation';
import PageNavigation from './pagination_components/PageNavigation';
import ItemAddDrawer from './cart_components/ItemAddDrawer';

class Products extends Component {
  constructor() {
    super();
    this.state = { 
      loading: true,
      drawerOpen: false,
      currentProduct: {},
    };
    this.openAddToCartDrawer = this.openAddToCartDrawer.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.addItemAndViewCart = this.addItemAndViewCart.bind(this);
  }

  openAddToCartDrawer = () => {
    this.setState({
      drawerOpen: true,
    })
  }
  
  addItemAndViewCart = (product) => (evt) => {
    const { handleInc, order } = this.props;
    this.setState({ 
      currentProduct: product,
    })
    handleInc(product, order)
    this.openAddToCartDrawer();
  }

  handleClickAway = (evt) => {
    this.setState({
      drawerOpen: false,
    });
  };

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
    const { pageProducts, order, count, idx, totalPages } = this.props;
    const { addItemAndViewCart, handleClickAway } = this;
    const { drawerOpen, currentProduct, loading } = this.state;
    const id = order ? order.id : '';
    return loading ? (
      <div className="allProductsContainer">
        <CircularProgress />
      </div>
    ) : (
      <div className="cartContainer">
        <div>
          <ArrowNavigation idx={idx} totalPages={totalPages} type="products"/>
        </div>
        <div className="theGrid">
          {pageProducts.map((_product, i) => {
            return (
              <ProductCard
                i={i}
                key={_product.id}
                product={_product}
                order={order}
                addItemAndViewCart={addItemAndViewCart}
              />
            );
          })}
        </div>
        <PageNavigation idx={idx} totalPages={totalPages} count={count}/>
        <ItemAddDrawer 
          drawerOpen={drawerOpen} 
          product={currentProduct} 
          order={order} 
          handleClickAway={handleClickAway}/>
      </div>
    );
  }
}

const mapStateToProps = ({ products, orders }, { idx }) => {
  const { pageProducts } = products;
  const order = orders.find(_order => _order.status === 'CART');
  const items = order ? order.Item : [];
  const count = items.reduce((acc, el) => {
    return (acc += el.quantity);
  }, 0);

  return {
    pageProducts: pageProducts.rows,
    totalPages: Math.ceil(pageProducts.count / 12),
    order,
    idx,
    count,
  };
};

const mapDispatchToProps = dispatch => ({
  getProductsByPage: idx => dispatch(getProductsByPage(idx)),
  handleInc: (product, order) => {
    dispatch(incrementLineItem(product, order));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
