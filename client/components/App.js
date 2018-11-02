import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../reducers/productReducer';
import { getOrders } from '../reducers/orderReducer';

//Components
import Navbar from './Navbar';
import Login from './Login';
import Products from './Products';
import ProductDetail from './products_components/ProductDetail';
import Cart from './Cart';
import Orders from './Orders';
import Home from './Home';
import PaginatedProducts from './products_components/PaginatedProducts';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };
    const renderProductDetail = ({ match, location }) => {
      const productId = match.params.id;
      return <ProductDetail productId={productId} location={location} />;
    };

    const renderProductsByPage = ({ match }) => {
      const idx = match.params.index;
      return <Products productIdx={idx}/>
    }

    const renderLogin = ({ history }) => <Login history={history} />;

    return (
      <HashRouter>
        <div>
          <Route render={renderNavbar} />
          <Route path="/login" render={renderLogin} />
          <Route path="/home" component={Home} />
          <Route path="/products/page/:index?" component={Products} />
          <Route exact path="/products/:id" render={renderProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
          <Route path="/home/search" component={PaginatedProducts} />
          {/*<Route path='/myaccount' component={MyAccount} />
          <Route path='/logout' />*/}
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ products, orders }, ownProps) => {
  console.log(ownProps)
  return { products, orders };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(getProducts());
      dispatch(getOrders());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
