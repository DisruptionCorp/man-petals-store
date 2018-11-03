import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewForm extends Component {
  constructor() {
    super();
    this.state = {
      author: '',
      review: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    addReview(this.state);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  render() {
    const { author, review } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Author</p>
        <input name="author" value={author} onChange={this.handleChange} />
        <br />
        <p>Review</p>
        <input name="review" value={review} onChange={this.handleChange} />
      </form>
    );
  }
}

export default connect()(ReviewForm);
