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
    const renderProductDetail = ({ match, history }) => {
      const productId = match.params.id;
      return <ProductDetail productId={productId} history={history} />;
    };

    const renderProductsByPage = ({ match }) => {
      const idx = match.params.index * 1;
      return <Products idx={idx} />;
    };

    const renderLogin = ({ history }) => <Login history={history} />;

    const renderAdmin = () => <AdminTool />;

    const renderProductsTool = ({ history }) => (
      <ProductsTool history={history} />
    );
    const renderOrdersTool = () => <OrdersTool />;

    return (
      <HashRouter>
        <div>
          <Route render={renderNavbar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" render={renderLogin} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/orders" component={Orders} />
          <Route
            exact
            path="/products/page/:index"
            render={renderProductsByPage}
          />
          <Route exact path="/products/:id" render={renderProductDetail} />
          <Route path="/admin" render={renderAdmin} />
          <Route exact path="/home/search" component={PaginatedProducts} />
          <Route exact path="/admin/products" render={renderProductsTool} />
          <Route exact path="/admin/orders" render={renderOrdersTool} />

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
