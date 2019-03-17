import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementLineItem, decrementLineItem } from '../../reducers/orderReducer';
import { Button, Icon } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    background: 'lightslategrey',
    borderRadius: 3,
    height: 35,
    width: '25px',
    margin: '0px 20px 0px 20px',
    color: 'white',
  },
})(Button);

class CartItem extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const { item, order, handleDec, handleInc } = this.props;
        return (
            <div className="cartItem">
                <div className="cartItemInfoLeft">
                    <img className="cartImg" src={item.product.photo}/>
                    <div className="itemIncrementor">
                        <div>{item.product.name}</div>
                        <div className="quantityButtons">
                            <StyledButton onClick={()=>handleDec(item.product, order)}><Icon>remove</Icon></StyledButton>
                            <div className="cartQuantity">{item.quantity}</div>
                            <StyledButton onClick={()=>handleInc(item.product, order)}><Icon>add</Icon></StyledButton>
                        </div>
                    </div>
                </div>
                <div className="cartItemPriceRight">
                ${item.cost}
                </div>
            </div>
          )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInc: (product, order) => {
        dispatch(incrementLineItem(product, order));
        },
        handleDec: (product, order) => {
        dispatch(decrementLineItem(product, order));
        },
    };
};

export default connect(null, mapDispatchToProps)(CartItem);