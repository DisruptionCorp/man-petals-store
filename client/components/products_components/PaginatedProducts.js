import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductDetail from './ProductDetail'

class PaginatedProducts extends Component {
  render() {
  	const { products } = this.props;
  	return (
  	  <div style={{ padding: "50px" }}>
  	  <hr />
  	  {products.map(product => {
  	  	return (
  	  	  <ProductDetail />
  	  	  <hr />
  	  	)
  	  })}
  	  </div>
  	)
  }
}

const mapStateToProps = ({products}) => { 
  return { products }
}

export default connect(mapStateToProps)(PaginatedProducts);