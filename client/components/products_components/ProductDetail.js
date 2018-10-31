import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductReview from './ProductReview';

class ProductDetail extends Component {
  render() {
    const { product } = this.props;
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
        <img src={photo} alt={name} height="50" width="50" />
        <br />
        <h5>Product Info:</h5>
        <ul>
          <li>{name}</li>
          <li>{description}</li>
          <li>Price: ${price}</li>
          <li>{stockRemaining}</li>
          <li>Tags: {tags.join(', ')}</li>
        </ul>
        <h5>Reviews:</h5>
        {reviews.map(review => {
          return <ProductReview review={review} key={review.id} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ products }, { productId }) => {
  const product = products.find(p => p.id === productId * 1);
  return { product };
};

export default connect(mapStateToProps)(ProductDetail);
