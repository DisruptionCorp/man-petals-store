import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Typography, Icon } from '@material-ui/core';
import { createOrder } from '../../reducers/orderReducer';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    background: 'lightslategrey',
    borderRadius: 3,
    height: 35,
    width: 'auto',
    margin: 10,
    color: 'white',
  },
})(Button);

class PageNavigation extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { idx, totalPages, count, type } = this.props;
        return (
            <div className="paginationFooter">
            {/* with checkout button in item drawer, not sure how much this checkout button is anymore */}
                <StyledButton
                    disabled={!count}
                    onClick={() => createOrder(order)}
                    component={Link}
                    to="/orders"
                >
                     CHECKOUT
                    <Icon>shopping-cart-plus</Icon>
                </StyledButton>
                <div>
                    <div className="pageButtons">
                    {idx > 2 && (
                        <StyledButton 
                            component={Link} 
                            to={`/${type}/page/1`}>
                            1
                        </StyledButton>
                    )}
                    {idx > 1 && <div>..</div>}
                    {idx > 1 && (
                        <StyledButton 
                            component={Link} 
                            to={`/${type}/page/${idx - 1}`}>
                            {/* {idx - 1} */}<Icon>arrow_back</Icon>
                        </StyledButton>
                    )}
                    <StyledButton>{idx}</StyledButton>
                    {idx + 1 < totalPages && (
                        <StyledButton 
                            component={Link} 
                            to={`/${type}/page/${idx + 1}`}>
                            {/* {idx + 1} */}<Icon>arrow_forward</Icon>
                        </StyledButton>
                    )}
                    {idx < totalPages && <div>..</div>}
                    {idx !== totalPages && (
                        <StyledButton 
                            component={Link} 
                            to={`/${type}/page/${totalPages}`}>
                            {totalPages}
                        </StyledButton>
                    )}
                    </div>
                    <div align="center">
                            Page {idx} of {totalPages}
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
