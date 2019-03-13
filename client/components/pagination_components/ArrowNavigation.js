import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    background: 'lightslategrey',
    borderRadius: 3,
    height: 35,
    width: 'auto',
    margin: 20,
    color: 'white',
  },
})(Button);

class ArrowNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { idx, totalPages, type } = this.props;
    return (
        <div className="arrowNavContainer">
            <StyledButton
                disabled={idx < 2}
                component={Link}
                to={`/${type}/page/${idx - 1}`}
                >
                <Icon>arrow_back</Icon>
            </StyledButton>
            <StyledButton
                disabled={idx >= totalPages}
                component={Link}
                to={`/${type}/page/${idx + 1}`}
                >
                <Icon>arrow_forward</Icon>
            </StyledButton>
      </div>
    );
  }
}

export default ArrowNavigation;