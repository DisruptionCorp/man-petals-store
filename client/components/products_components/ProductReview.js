import React, { Component } from 'react';

export default class ProductReview extends Component {
  render() {
    const { review } = this.props;
    const { author, content } = review;
    return (
      <div>
        <ul>
          <li>Author: {author}</li>
          <li>Review: {content}</li>
        </ul>
      </div>
    );
  }
}
