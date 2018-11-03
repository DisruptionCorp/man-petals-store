import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
<<<<<<< HEAD
import { Paper, 
		 Dialog, 
		 DialogTitle, 
		 DialogContent, 
		 DialogActions, 
		 DialogContentText,
		 Button,
		 Icon,
		 CircularProgress } from '@material-ui/core';
import { _getProducts, getProductsByPage } from '../../reducers/productReducer'

class PaginatedProducts extends Component {
  constructor() {
  	super()
  	this.state={ closeDialog: false, loading: true }
  	this.handleClose = this.handleClose.bind(this);
=======
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@material-ui/core';

class PaginatedProducts extends Component {
  constructor() {
    super();
    this.state = { closeDialog: false };
    this.handleClose = this.handleClose.bind(this);
>>>>>>> 7d7a623bd60f801d475e8cbd113a969f1fa57d7f
  }

  handleClose() {
    this.setState({ closeDialog: true });
  }

<<<<<<< HEAD
  componentDidMount() {
  	const { idx } = this.props;
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  
  render() {
  	const { products, order, totalPages, idx } = this.props;
  	const { handleClose } = this;
    return this.state.loading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <CircularProgress />
      </div>
    ) : (
  	  <div style={{ padding: "50px" }}>
  	  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                disabled={idx < 2}
                component={Link}
                to={`/search/tags/${idx - 1}`}
              >
                <Icon>arrow_back</Icon>
              </Button>
              <Button
                disabled={idx >= totalPages}
                component={Link}
                to={`/search/tags/${idx + 1}`}
              >
                <Icon>arrow_forward</Icon>
              </Button>
            </div>
      <div>
  	  {products.map(product => {
  	  	return (
  	  	<div>
  	  	  <ProductCard product={product} order={order}/>
  	  	</div>
  	  	)
  	  })}
  	  </div>
  	  {!products.length &&
  	  <Dialog
          open={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Searching for a Product?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sorry, there are no products under these tags. Please click 'Close' to go back to search.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" component={Link} to='/home'>
              Close
            </Button>
          </DialogActions>
        </Dialog>}

        <div>{totalPages}</div>
  	  </div>
  	)
  }
}

const mapStateToProps = ({products, orders}, ownProps) => { 
  console.log(products.pageProducts)
  return { 
  	products: products.pageProducts.rows, 
  	orders,
  	totalPages: products.pageProducts.count,
  	idx: ownProps.idx
  }
}

const mapDispatchToProps = dispatch => ({
  _getProducts: () => dispatch(_getProducts()),
  getProductsByPage: idx => dispatch(getProductsByPage(idx))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaginatedProducts);
=======
  render() {
    const { products, order } = this.props;
    const { handleClose } = this;
    return (
      <div style={{ padding: '50px' }}>
        {products.map(product => {
          return (
            <div>
              <ProductCard product={product} order={order} />
            </div>
          );
        })}
        {!products.length && (
          <Dialog
            open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Searching for a Product?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Sorry, there are no products under these tags. Please click
                'Close' to go back to search.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="primary"
                component={Link}
                to="/home"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  }
}


const mapStateToProps = ({products, orders}) => { 
  return { products: products.allProducts, orders }
}


export default connect(mapStateToProps)(PaginatedProducts);
>>>>>>> 7d7a623bd60f801d475e8cbd113a969f1fa57d7f
