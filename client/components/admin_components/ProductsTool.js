import React, { Component } from 'react';
import ProductCreateForm from './ProductCreateForm';
import ProductDeleteForm from '/ProductDeleteForm';

class ProductsTool extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      inv_quantity: 0,
      photo: '',
      price: 0,
      tags: [],
    };
  }
  render() {
    return (
      <div>
        <h4>Products Admin Tool </h4>
        &nbsp;
        <h5>Add Product</h5>
        <ProductCreateForm />
        <h5>Delete Product</h5>
        <ProductDeleteForm />
      </div>
    );
  }
}

export default ProductsTool;
