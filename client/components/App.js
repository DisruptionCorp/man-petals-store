import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../reducers/productReducer';
import { getOrders } from '../reducers/orderReducer';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    console.log('The this.props are: ', this.props);
    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };
    
    const renderLogin = ({ history }) => <Login history={history} />;
    const renderHome = ({ history }) => <Home />;

    return (
      <HashRouter>
        <div>
          <Route render={renderNavbar} />
          <Route exact path="/login" render={renderLogin} />
          <Route path="/home" component={Home} />
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
