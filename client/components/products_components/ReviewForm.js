import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReview } from '../../reducers/productReducer';
import { Card, 
         CardContent, 
         Typography, 
         Button, 
         FormLabel, 
         TextField, 
         Select, 
         OutlinedInput, 
         FormControl } from '@material-ui/core';

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
      <Card style={{ margin: '50px', padding: '25px' }}>
      <CardContent>
      <Typography variant="display1">Add Review</Typography>
      <hr />
      <form onSubmit={this.handleSubmit}>
        <FormLabel style={{ textColor: 'black'}}>Author: {author}</FormLabel>
        <br />
        <FormControl variant="outlined">
        <FormLabel>Review: </FormLabel>
        <TextField name="content" value={content} onChange={this.handleChange} fullWidth/>
        </FormControl>
        <br />
        <FormControl variant="outlined">
        <FormLabel>Rating: </FormLabel>
        <Select native
                name="rating" 
                value={rating} 
                onChange={this.handleChange}
                input={
                <OutlinedInput
                name="age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
        </FormControl>
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit">Submit Review</Button>
        </div>
      </form>
      </CardContent>
      </Card>
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
