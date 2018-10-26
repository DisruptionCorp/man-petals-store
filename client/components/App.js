import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'
import Navbar from './Navbar';

class App extends Component {
  render() {

    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };

    return (
      <HashRouter>
        <div>
          <Route path="/" render={renderNavbar} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
