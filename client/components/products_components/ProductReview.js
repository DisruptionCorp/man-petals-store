import React, { Component } from 'react';

export default class ProductReview extends Component {
  render() {
    const { review } = this.props;
    const { rating, content, user } = review;
    const name = user ? user.name : 'Anonymous';
    return (
      <div>
        <ul>
          <li>Author: {name}</li>
          <li>Review: {content}</li>
          <li>Rating: {' *'.repeat(rating)}</li>
        </ul>
      </div>
    );
  }
}
