import React, { Component } from 'react';
import ProductReview from './ProductReview';
import { connect } from 'react-redux';
import { incrementLineItem, decrementLineItem, createOrder } from '../../reducers/orderReducer';
import { getProduct } from '../../reducers/productReducer'
import ReviewForm from './ReviewForm';

class ProductDetail extends Component {
  
  componentDidMount () {
    this.props.getProduct(this.props.productId);
  }

  render() {
    const {
      handleInc,
      handleDec,
      createOrder,
      product,
      reviews,
      order,
      quantity,
      history,
    } = this.props;

    console.log('the props are: ', this.props);
    // defensive code to deal with products not having loaded yet
    if (!product || !order) {
      return null;
    }
    const { name, description, photo, tags, inv_quantity, price } = product;
    let stockRemaining = 'In Stock';
    if (inv_quantity < 10) stockRemaining = 'Limited Stock!';
    if (inv_quantity === 0) stockRemaining = 'Sold Out';
    
    return (
      <div>
        <img src={photo} alt={name} height="100" width="100" />
        <br />
        <h5>Product Info:</h5>
        <ul>
          <li>{name}</li>
          <li>{description}</li>
          <li>Price: ${price}</li>
          <li>{stockRemaining}</li>
          <li>Tags: {tags ? tags.join(', ') : ''}</li>
        </ul>
        <p>{quantity} units in cart</p>
        <button onClick={() => handleInc(product, order)}>Add to cart</button>
        <button onClick={() => handleDec(product, order)}>
          Remove from cart
        </button>
        <br />
        <button
          disabled={!quantity}
          onClick={() => {
            createOrder(order);
            history.push('/orders');
          }}
        >
          Create Order
        </button>
        <h5>Reviews:</h5>
        {reviews.length ? (
          reviews.map(review => {
            return <ProductReview review={review} key={review.id} />;
          })
        ) : (
          <p>There are no reviews yet for this product!</p>
        )}
        <h5>Add Review</h5>
        <ReviewForm product={product} />
      </div>
    );
  }
}

const mapStateToProps = ({ products, orders }, { productId, history }) => {
  const product = products.selectedProduct;
  const reviews = product ? product.reviews : [];
  const order = orders.find(o => o.status == 'CART');
  const lineItem = order ? order.Item.find(i => i.productId == productId) : [];
  const quantity = lineItem ? lineItem.quantity : 0;
  return {
    productId,
    product,
    reviews,
    order,
    quantity,
    history,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProduct: (productId)=> {
      dispatch(getProduct(productId));
    },
    handleInc: (product, order) => {
      dispatch(incrementLineItem(product, order));
    },
    handleDec: (product, order) => {
      dispatch(decrementLineItem(product, order));
    },
    createOrder: order => dispatch(createOrder(order)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);

//test
