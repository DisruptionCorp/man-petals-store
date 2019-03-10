import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsByPage, getProductsByTags } from '../reducers/productReducer';
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
import SearchErrorDialog from './products_components/SearchErrorDialog';

class Products extends Component {
  constructor() {
    super();
    this.state = { 
      loading: true,
      closeDialog: false,
      drawerOpen: false,
      currentProduct: {},
    };
    this.openAddToCartDrawer = this.openAddToCartDrawer.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.addItemAndViewCart = this.addItemAndViewCart.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  handleClose() {
    this.setState({ closeDialog: true });
  }

  handleClickAway = (evt) => {
    this.setState({
      drawerOpen: false,
    });
  };

  componentDidMount() {
    const { idx, getProductsByPage, type } = this.props;
    type == "products" ? getProductsByPage(idx) : null
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentDidUpdate(prev) {
    const { idx, getProductsByPage } = this.props;
    if (idx != prev.idx) {
      getProductsByPage(idx)
    }
  }

  render() {
    const { products, order, count, idx, totalPages, type } = this.props;
    const { addItemAndViewCart, handleClickAway, handleClose } = this;
    const { drawerOpen, currentProduct, loading } = this.state;
    const id = order ? order.id : '';
    console.log("from all products component: ", order)
    return loading ? (
      <div className="allProductsContainer">
        <CircularProgress />
      </div>
    ) : (
      <div className="cartContainer">
        <div>
          <ArrowNavigation idx={idx} totalPages={totalPages} type={type}/>
        </div>
        <div className="theGrid">
          {products.map((_product, i) => {
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
        <PageNavigation idx={idx} totalPages={totalPages} count={count} type={type}/>
        <ItemAddDrawer 
          drawerOpen={drawerOpen} 
          product={currentProduct} 
          order={order} 
          handleClickAway={handleClickAway}/>
        {(!products.length && type == "search") && (
          <SearchErrorDialog handleClose={handleClose}/>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ products, orders }, { idx, type }) => {
  // attempting to merge both search grids and all products grid - still trying to get it right
  const { pageProducts, tagProducts } = products;
  const order = orders.find(_order => _order.status === 'CART');
  let count;
  let totalPages;
  let tagProductsPerPage;
  // offset and limit pagination logic happens on frontend because tags are being sent in on a post route
  if(type=="search"){
    const productsPerPage = 9;
    const start = (idx - 1) * productsPerPage;
    const end = start + productsPerPage;
    tagProductsPerPage = tagProducts.rows.slice(start, end);
    totalPages = Math.ceil(tagProducts.count / productsPerPage);
    console.log(tagProducts)
  } 
  // offset and limit pagination logic happens in backend for all products
  else if (type=="products") {
    const items = order ? order.Item : [];
    count = items.reduce((acc, el) => {
      return (acc += el.quantity);
    }, 0);
    totalPages = Math.ceil(pageProducts.count / 12) 
  }
  return {
    products: type == "products" ? pageProducts.rows : tagProductsPerPage,
    totalPages,
    order,
    idx,
    count,
    type
  };
};

const mapDispatchToProps = dispatch => ({
  getProductsByPage: idx => dispatch(getProductsByPage(idx)),
  getProductsByTags: (tags) => dispatch(getProductsByTags(tags)),
  handleInc: (product, order) => {
    dispatch(incrementLineItem(product, order));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
