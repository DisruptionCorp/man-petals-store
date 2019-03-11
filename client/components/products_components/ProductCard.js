import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

class ProductCard extends Component {

  render() {
    const { product, openAddToCartDrawer } = this.props;
    return (
      <div className="productGridItem animated fadeInUpBig">
        <div className="boxImgContainer">
          <img src={product.photo} className="productCardImg"/>
          <div className="priceBadge">{product.price ? `$${product.price}` : 'Cost coming soon!'}</div>
          <div className="overlay">
            <Button className="addToCartButton" onClick={openAddToCartDrawer(product)}>ADD TO CART</Button>
          </div>
        </div>
        <div className="flowerDetails">
            <Link className="productNameLink" to={`/products/${product.id}`}>{product.name}</Link>
        </div>
      </div>
    );
  }
}

export default ProductCard;
