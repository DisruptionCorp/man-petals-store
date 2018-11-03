import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReview } from '../../reducers/productReducer';

class ReviewForm extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      rating: 5,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { productId, addReview } = this.props;
    let { userId } = this.props;
    if (!userId) {
      userId = null;
    }
    addReview({ ...this.state, productId, userId });
    this.setState({
      content: '',
      rating: 5,
    });
  };

  handleChange = e => {
    if (e.target.name == 'rating') {
      return this.setState({
        rating: e.target.value * 1,
      });
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { author } = this.props;
    const { content, rating } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Author: {author}</label>
        <br />
        <label>Review: </label>
        <input name="content" value={content} onChange={this.handleChange} />
        <br />
        <label>Rating: </label>
        <select name="rating" value={rating} onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }, { product }) => {
  const productId = product.id;
  const author = auth.name ? auth.name : 'Anonymous';
  const userId = auth.id ? auth.id : '';
  return {
    productId,
    author,
    userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addReview: review => {
      dispatch(addReview(review));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewForm);
