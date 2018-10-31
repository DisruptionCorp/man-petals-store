import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../reducers/productReducer';
import { getOrders } from '../reducers/orderReducer';

//Components
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    //console.log('The this.props are: ', this.props);
    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };

    const renderLogin = ({ history }) => <Login history={history} />;

    return (
      <HashRouter>
        <div>
          <Route render={renderNavbar} />
          <Route path="/login" render={renderLogin} />
          <Route path="/home" component={Home} />
          {/*<Route path="/products" component={Products} />*/}
          <Route path='/cart' component={Cart} />
          <Route path='/orders' component={Orders} />
          {/*<Route path='/myaccount' component={MyAccount} />
          <Route path='/logout' />*/}
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ products, orders }) => {
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
