import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import ProductDetail from './ProductDetail';
import { Button, ClickAwayListener } from '@material-ui/core';
import ItemAddDrawer from '../cart_components/ItemAddDrawer';

class ProductCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      drawerOpen: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
  }
  handleClick = (evt) => {
    this.setState({ 
      drawerOpen: true 
    })
  }

  handleClickAway = (evt) => {
    this.setState({
      drawerOpen: false,
    });
  };

  render() {
    const { product, itemQuantity, order, i } = this.props;
    const { handleClick, handleClickAway } = this;
    const { drawerOpen } = this.state;
    return (
      <div className="productGridItem">
        <div className="boxImgContainer">
          <img src={product.photo} className="animated fadeInUpBig productCardImg"/>
          <div className="priceBadge">{product.price ? `$${product.price}` : 'Cost coming soon!'}</div>
          <div className="overlay">
            <Button className="addToCartButton" onClick={handleClick}>ADD TO CART</Button>
          </div>
        </div>
        <div className="flowerDetails">
            <Link className="productNameLink" to={`/products/${product.id}`}>{product.name}</Link>
        </div>
        <ClickAwayListener onClickAway={handleClickAway}>
          <ItemAddDrawer drawerOpen={drawerOpen} product={product} order={order} itemQuantity={itemQuantity}/>
        </ClickAwayListener>
      </div>
    );
  }
}

const mapStateToProps = (state, { order, product }) => {
  let item = order
    ? order.Item.find(item => item.productId === product.id)
    : null;
  return {
    order,
    product,
    itemQuantity: item ? item.quantity : 0,
  };
};


export default connect(mapStateToProps)(ProductCard);
