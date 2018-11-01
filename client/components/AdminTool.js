import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminTool extends Component {
  constructor() {
    super();
    this.state = {
      adminUser: {},
    };
  }

  render() {
    return <hr />;
  }
}

const mapStateToProps = ({ user }) => {
  return;
};
export default connect(mapStateToProps)(AdminTool);
