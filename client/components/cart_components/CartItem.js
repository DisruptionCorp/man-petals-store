import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementLineItem, decrementLineItem } from '../../reducers/orderReducer';
import { Button, Icon } from '@material-ui/core'

class CartItem extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const { item, order, handleDec, handleInc } = this.props;
        console.log(item)
        return (
            <div className="cartItem">
                <div className="cartItemInfoLeft">
                    <img className="cartImg" src={item.product.photo}/>
                    <div className="itemIncrementor">
                        <div>{item.product.name}</div>
                        <div className="quantityButtons">
                            <Button onClick={()=>handleDec(item.product, order)}><Icon>remove</Icon></Button>
                            <div className="cartQuantity">{item.quantity}</div>
                            <Button onClick={()=>handleInc(item.product, order)}><Icon>add</Icon></Button>
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