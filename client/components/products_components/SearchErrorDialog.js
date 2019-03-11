import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button
} from '@material-ui/core';

class SearchErrorDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleClose } = this.props;
        return (
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
        )
  }
}

export default SearchErrorDialog;