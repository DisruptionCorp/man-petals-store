import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { destroyProduct } from '../../reducers/productReducer';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteProduct extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
    };
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
    console.log(this.state);
  };

  handleDelete = ev => {
    ev.preventDefault();
    console.log('delete');
    this.props.deleteProduct({ id: this.state.id }).then(() => {
      this.setState({ id: '' });
    });
  };

  render() {
    const { products } = this.props;
    const allProducts = products.allProducts.slice(0);

    allProducts.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return (
      <div className="productsDelete">
        <br />
        <select
          className="myselect"
          name="id"
          value={this.state.id}
          onChange={this.handleChange}
        >
          <option value="">--select product to delete--</option>
          {allProducts.map(product => (
            <option key={product.id} name="id" value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <div className="enrollmentButtons">
          <br />
          <Button
            disabled={!this.state.id}
            variant="contained"
            color="secondary"
            type="submit"
            onClick={this.handleDelete}
          >
            Delete Product
            <DeleteIcon />
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: product => dispatch(destroyProduct(product)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteProduct);
