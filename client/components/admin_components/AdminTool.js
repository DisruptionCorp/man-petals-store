import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AdminTool extends Component {
  render() {
    return (
      <div>
        <br />
        <Link to="/admin/products">Products Tool</Link>
        &nbsp; &nbsp;
        <Link to="/admin/orders">Orders Tool</Link>
      </div>
    );
  }
}
export default AdminTool;
