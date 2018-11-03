import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AdminTool extends Component {
  render() {
    return (
      <div>
        <br />
        <Link to="/admin/products">Products Admin</Link>
        &nbsp; &nbsp;
        <Link to="/admin/orders">Orders Admin</Link>
      </div>
    );
  }
}
export default AdminTool;
