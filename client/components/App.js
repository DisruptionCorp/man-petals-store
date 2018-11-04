import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../reducers/productReducer';
import { getOrders } from '../reducers/orderReducer';
import { exchangeTokenForAuth } from '../reducers/authReducer';

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
import SignUp from './SignUp';

class App extends Component {
  componentDidMount() {
    this.props.init();
    console.log(this.props.auth);
  }

  render() {
    const renderNavbar = ({ history, location }) => {
      const id = location.pathname.split('/').pop();
      return <Navbar id={id} history={history} />;
    };
    const renderProductDetail = ({ match, history }) => {
      const productId = match.params.id;
      return <ProductDetail productId={productId} history={history} />;
    };

    const renderProductsByPage = ({ match }) => {
      const idx = match.params.index * 1;
      return <Products idx={idx} />;
    };

    const renderSearchPaginated = ({ match }) => {
      const idx = match.params.index * 1;
      return <PaginatedProducts idx={idx} />;
    };

    const renderHome = ({ history }) => {
      return <Home history={history} />;
    };

    const renderLogin = ({ history }) => <Login history={history} />;

    const renderAdmin = () => <AdminTool />;

    const renderProductsTool = ({ history }) => (
      <ProductsTool history={history} />
    );
    const renderOrdersTool = () => <OrdersTool />;

    const renderSignUp = ({ history }) => <SignUp history={history} />

    const { auth } = this.props;

    return (
      <HashRouter>
        {!auth ? (
          <div>
            <Route render={renderNavbar} />
            <Route exact path="/" render={renderLogin} />
            <Route exact path="/signup" render={renderSignUp}/>
            <Route exact path="/login" render={renderLogin}/>
          </div>
        ) : (
          <div>
            <Route render={renderNavbar} />
            <Route exact path="/" render={renderHome} />
            <Route exact path="/login" render={renderLogin} />
            <Route exact path="/signup" render={renderSignUp}/>
            <Route exact path="/home" render={renderHome} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/orders" component={Orders} />
            <Route
              exact
              path="/products/page/:index"
              render={renderProductsByPage}
            />
            <Route exact path="/products/:id" render={renderProductDetail} />
            <Route path="/admin" render={renderAdmin} />
            <Route
              exact
              path="/search/tags/:index?"
              render={renderSearchPaginated}
            />
            <Route exact path="/admin/products" render={renderProductsTool} />
            <Route exact path="/admin/orders" render={renderOrdersTool} />
          </div>
        )}
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ products, orders }, ownProps) => {
  const auth = window.localStorage.getItem('token') ? true : false;
  console.log(auth);
  const { allProducts } = products;
  return { allProducts, orders, auth };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    init: () => {
      dispatch(exchangeTokenForAuth(history));
      dispatch(getProducts());
      dispatch(getOrders());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
