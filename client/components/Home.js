import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

//Components
import SearchBar from './SearchBar';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <div className="hero-text">
          MANPETALS
          <SearchBar history={history} />
        </div>
      </div>
    );
  }
}
