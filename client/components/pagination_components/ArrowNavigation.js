import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@material-ui/core';

class ArrowNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { idx, totalPages, type } = this.props;
    return (
        <div className="arrowNavContainer">
            <Button
                disabled={idx < 2}
                component={Link}
                to={`/${type}/page/${idx - 1}`}
                >
                <Icon>arrow_back</Icon>
            </Button>
            <Button
                disabled={idx >= totalPages}
                component={Link}
                to={`/${type}/page/${idx + 1}`}
                >
                <Icon>arrow_forward</Icon>
            </Button>
      </div>
    );
  }
}

export default ArrowNavigation;