import React, { Component } from 'react';
import { Typography,
         ExpansionPanelDetails } from '@material-ui/core';

export default class ProductReview extends Component {
  render() {
    const { review } = this.props;
    const { rating, content, user } = review;
    const name = user ? user.name : 'Anonymous';
    return (
        <ExpansionPanelDetails style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <Typography variant="subheading"><strong>Author:</strong> {name}</Typography>
          <Typography variant="subheading"><strong>Review:</strong> {content}</Typography>
          <Typography variant="subheading"><strong>Rating:</strong> {' *'.repeat(rating)}</Typography>
        </ExpansionPanelDetails>
    );
  }
}
