import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductDetail from './ProductDetail';
import { Paper, 
		 Dialog, 
		 DialogTitle, 
		 DialogContent, 
		 DialogActions, 
		 DialogContentText,
		 Button } from '@material-ui/core';

class PaginatedProducts extends Component {
  constructor() {
  	super()
  	this.state={ closeDialog: false }
  	this.handleClose = this.handleClose.bind(this);
  }

  handleClose(){
  	this.setState(closeDialog: true)
  }
  
  render() {
  	const { products } = this.props;
  	const { handleClose } = this;
  	return (
  	  <div style={{ padding: "50px" }}>
  	  {products.map(product => {
  	  	return (
  	  	<Paper>
  	  	  <ProductDetail />
  	  	  <hr />
  	  	</Paper>
  	  	)
  	  })}
  	  {products.length &&
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
  	  </div>
  	)
  }
}

const mapStateToProps = ({products}) => { 
  return { products }
}

export default connect(mapStateToProps)(PaginatedProducts);