import React, { Component } from 'react';
import ProductReview from './ProductReview';
import { connect } from 'react-redux';
import {
  incrementLineItem,
  decrementLineItem,
  createOrder,
} from '../../reducers/orderReducer';
import { getProduct } from '../../reducers/productReducer';
import ReviewForm from './ReviewForm';
import { Typography, Icon, Button, Card, CardContent, ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

class ProductDetail extends Component {
  componentDidMount() {
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
    if (!product || !order || !reviews) {
      return null;
    }
    const { name, description, photo, tags, inv_quantity, price } = product;
    let stockRemaining = 'In Stock';
    if (inv_quantity < 10) stockRemaining = 'Limited Stock!';
    if (inv_quantity === 0) stockRemaining = 'Sold Out';

    return (
      <div>
        <Card style={{ margin: '50px', padding: '25px' }}>
        <CardContent>
        <img src={photo} alt={name} height="100" width="100" />
        <br />
        <Typography variant="headline">Product Info:</Typography>
          <Typography variant="title">{name}</Typography>
          <Typography variant="subheading">{description}</Typography>
           <Typography variant="subheading">Price: ${price}</Typography>
           <Typography variant="subheading">{stockRemaining}</Typography>
           <Typography variant="subheading">Tags: {tags ? tags.join(', ') : ''}</Typography>
        <Typography variant="subheading">{quantity} {name}s in cart</Typography>
        <Button onClick={() => handleInc(product, order)}>Add to cart</Button>
        <Button onClick={() => handleDec(product, order)}>Remove from cart</Button>
        <br />
        <Button
          disabled={!quantity}
          onClick={() => {
            createOrder(order);
            history.push('/orders');
          }}
        >
        <Icon>shopping-cart-plus</Icon>
          Create Order
        </Button>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Reviews</Typography>
            </ExpansionPanelSummary>
        {reviews.length ? (
          reviews.map(review => {
            return <ProductReview review={review} key={review.id} />;
          })
        ) : (
          <p>There are no reviews yet for this product!</p>
        )}
        </ExpansionPanel>
        </CardContent>
        </Card>
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
    getProduct: productId => {
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
