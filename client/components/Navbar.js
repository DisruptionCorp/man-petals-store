import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Grow,
  Badge,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from '../reducers/authReducer';

class Navbar extends Component {
  render() {
    const { auth, isLoggedIn, id, logout, history } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            DisruptCo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#myNavbar"
            aria-controls="myNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className={id == 'home' ? 'nav-item active' : 'nav-item'}>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className={id == 'products' ? 'nav-item active' : 'nav-item'}>
                <Link to={`/products/page/${1}`} className="nav-link">
                  Products
                </Link>
              </li>
              <li className={id == 'cart' ? 'nav-item active' : 'nav-item'}>
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
              <li className={id == 'orders' ? 'nav-item active' : 'nav-item'}>
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
              </li>
              <li className={id == 'admin' ? 'nav-item active' : 'nav-item'}>
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav my-2 my-lg-0">
              <li className="nav-item">
                <p className="navbar-text">
                  {isLoggedIn ? `Logged in as ${auth.name}` : `Not logged in`}
                </p>
              </li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <button class="btn btn-light my-2 my-sm-0" onClick={logout}>
                    Logout
                  </button>
                ) : (
                  <button
                    class="btn btn-light my-2 my-sm-0"
                    onClick={() => {
                      history.push('/login');
                    }}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, orders }, { id, history }) => {
  const order = orders.find(_order => {
    return _order.status === 'CART';
  });
  const items = order ? order.Item : [];
  const count = items.reduce((acc, el) => {
    return (acc += el.quantity);
  }, 0);
  return {
    isLoggedIn: auth.id ? auth : false,
    count,
    auth: true /*auth.id ? auth.admin : false*/,
    id,
    history,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
