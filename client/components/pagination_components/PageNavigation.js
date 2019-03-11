import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Typography, Icon } from '@material-ui/core';
import { createOrder } from '../../reducers/orderReducer';

class PageNavigation extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { idx, totalPages, count, type } = this.props;
        console.log("from page nav: ", count)
        return (
            <div className="paginationFooter">
                <Button
                    disabled={!count}
                    onClick={() => createOrder(order)}
                    component={Link}
                    to="/orders"
                >
                    <Icon>shopping-cart-plus</Icon>
                    {' CREATE'}
                </Button>
                <div>
                    <div className="pageButtons">
                    {idx > 2 && (
                        <Button 
                            component={Link} 
                            to={`/${type}/page/1`}>
                            1
                        </Button>
                    )}
                    {idx > 1 && <Typography>..</Typography>}
                    {idx > 1 && (
                        <Button 
                            component={Link} 
                            to={`/${type}/page/${idx - 1}`}>
                            {idx - 1}
                        </Button>
                    )}
                    <Button>{idx}</Button>
                    {idx + 1 < totalPages && (
                        <Button 
                            component={Link} 
                            to={`/${type}/page/${idx + 1}`}>
                            {idx + 1}
                        </Button>
                    )}
                    {idx < totalPages && <Typography>..</Typography>}
                    {idx !== totalPages && (
                        <Button 
                            component={Link} 
                            to={`/${type}/page/${totalPages}`}>
                            {totalPages}
                        </Button>
                    )}
                    </div>
                    <div className="totalPagesContainer">
                        <Typography variant="body1">
                            Page {idx} of {totalPages}
                        </Typography>
                    </div>
                </div>
            </div>
        )
    }
}
  
  const mapDispatchToProps = dispatch => ({
    createOrder: order => dispatch(createOrder(order)),
  });
  
  export default connect(
    null,
    mapDispatchToProps
  )(PageNavigation);
