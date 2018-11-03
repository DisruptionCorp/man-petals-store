import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
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
import AdminTool from './admin_components/AdminTool';
import OrdersTool from './admin_components/OrdersTool';
import ProductsTool from './admin_components/ProductsTool';

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
      const idx = match.params.index * 1;
      return <Products idx={idx} />;
    };

    const renderLogin = ({ history }) => <Login history={history} />;

    const renderAdmin = () => <AdminTool />;
    const renderProductsTool = history => <ProductsTool history={history} />;
    const renderOrdersTool = () => <OrdersTool />;

    return (
      <HashRouter>
        <div>
          <Route render={renderNavbar} />
          <Route path="/login" render={renderLogin} />
          <Route path="/home" component={Home} />
          <Route path="/products/page/:index" render={renderProductsByPage} />
          <Route path="/admin" render={renderAdmin} />
          <Switch>
            <Route path="/admin/products" render={renderProductsTool} />
            <Route path="/admin/orders" render={renderOrdersTool} />
          </Switch>
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
  console.log(ownProps);
  const { allProducts } = products;
  return { allProducts, orders };
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
