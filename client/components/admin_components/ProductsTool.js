import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../../reducers/productReducer';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import DeleteProduct from './DeleteProduct';
import { createImage } from '../../reducers/imageReducer';

class ProductsTool extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      inv_quantity: '',
      // photo: '',
      price: '',
      tags: [],
    };
  }

  componentDidMount() {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      this.props.createImage(fileReader.result);
    });
    this.el.addEventListener('change', () => {
      fileReader.readAsDataURL(this.el.files[0]);
    });
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  };

  onSave = ev => {
    ev.preventDefault();
    const { tags } = this.state;

    if (tags.length) {
      let tempTags = [];
      let tempArr = tags.replace(/ /g, '').split(',');
      tempArr.forEach(element => {
        tempTags.push(element);
      });
      this.props
        .createProduct(Object.assign({}, this.state, { tags: tempTags }))
        .then(() =>
          this.setState({
            name: '',
            description: '',
            inv_quantity: '',
            price: '',
            tags: [],
          })
        );
    } else {
      this.props.createProduct(this.state).then(() =>
        this.setState({
          name: '',
          description: '',
          inv_quantity: '',
          price: '',
        })
      );
    }
  };

  render() {
    const { images } = this.props;
    return (
      <div className="productTool">
        <Typography color="primary" variant="title" component="h4">
          Products Admin
        </Typography>
        <div className="addDeleteProduct">
          <form name="addProduct" className="productCreate">
            <Typography color="primary" variant="subheading" component="h5">
              Add Product
            </Typography>
            <label htmlFor="name">name: </label>
            <input
              className="mytext"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="description">description: </label>
            <input
              className="mytext"
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="tags">tags: </label>
            <input
              className="mytext"
              name="tags"
              type="text"
              value={this.state.tags}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="price">price: $ </label>
            <input
              style={{ width: '100px' }}
              className="mytext"
              name="price"
              type="number"
              min="0.00"
              step=".01"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="inv_quantity">inventory quantity: </label>
            <input
              style={{ width: '100px' }}
              className="mytext"
              name="inv_quantity"
              type="number"
              min="0"
              step="1"
              value={this.state.inv_quantity}
              onChange={this.handleChange}
            />
            <br />
            <div className="bt">
              <Button
                disabled={
                  !(
                    this.state.name &&
                    this.state.inv_quantity &&
                    this.state.price
                  )
                }
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.onSave}
              >
                Send
                <Icon>send</Icon>
              </Button>
            </div>
            <div>
              <input ref={el => (this.el = el)} type="file" />
              <ul>
                {images.map(image => (
                  <li key={image.id}>
                    <img src={image.url} />
                  </li>
                ))}
              </ul>
            </div>
          </form>
          <form name="deleteProduct" className="productDelete">
            <Typography color="primary" variant="subheading" component="h5">
              Delete Product
            </Typography>
            <DeleteProduct />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ images }) => {
  return {
    images,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product)),
    createImage: data => dispatch(createImage(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsTool);
