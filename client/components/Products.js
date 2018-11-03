import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createOrder } from '../reducers/orderReducer';
import { getProducts } from '../reducers/productReducer';
import { Grid, Icon, Button, SvgIcon, CircularProgress } from '@material-ui/core';


//presentation components
import ProductCard from './products_components/ProductCard';

class Products extends Component {
  constructor(){
    super()
    this.state={ loading: true }
  }

  componentDidMount(){
    const { idx, getProducts } = this.props;
    getProducts(idx);
    setInterval(()=>{ 
      this.setState({ loading: false })
    }, 5000)
  }

  /*handleClick = (e) => {
    const { getProducts, match } = this.props;
    const index = match.params.index*1;
    getProducts(index);
  }*/

  componentDidUpdate(prev){
    if(prev.props && prev.props.idx !== this.props.idx){
      console.log('This is the previous: ', prev.props.idx)
      this.props.getProducts(this.props.idx);
    }
  }

  render() {
    const { products, order, createOrder, idx } = this.props;
    const { handleClick } = this;
    const id = order ? order.id : '';
    const items = order ? order.Item : [];
    const count = items.reduce((acc, el) => {
      return (acc += el.quantity);
    }, 0);

    return this.state.loading ?
      (<div style={{ display: 'flex', 
                     justifyContent: 'center', 
                     padding: '30px'}}>
        <CircularProgress />
      </div>) :
      (<div className="cartContainer">
        <div>
          Your Order ID is ({id}
          ).
        </div>
        <div>Your cart contains {count} items.</div>
        <hr />
        <div>
          <h2>Products</h2>
          <div >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button disabled={idx<2} 
                    component={Link} 
                    to={`/products/page/${idx-1}`}>
              <Icon>arrow_back</Icon>
            </Button>
            <Button component={Link} 
                    to={`/products/page/${idx+1}`}>
              <Icon>arrow_forward</Icon>
            </Button>
            </div>
          </div>
          {products.map(_product => {
            return (
              <Grid
                container
                spacing={24}
                direction="row"
                display="space-around"
                alignItems="center"
                style={{ display: 'flex' }}
                key={_product.id}
              >
                <ProductCard
                  key={_product.id}
                  product={_product}
                  order={order}
                />
              </Grid>
            );
          })}
        </div>
        <Button
          disabled={count == 0}
          onClick={() => createOrder(order)}
          component={Link}
          to="/orders"
        >
          <Icon>shopping-cart-plus</Icon>
          {' CREATE'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ products, orders }, { match }) => {
  const order = orders.find(_order => _order.status === 'CART');
  const idx = match.params.index*1
  console.log(products)
  return {
    products,
    order,
    idx
  };
};

const mapDispatchToProps = dispatch => ({
    getProducts: idx => dispatch(getProducts(idx)),
    createOrder: order => dispatch(createOrder(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
