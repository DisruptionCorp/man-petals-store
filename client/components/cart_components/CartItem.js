import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementLineItem, decrementLineItem } from '../../reducers/orderReducer';
import { Button } from '@material-ui/core'

class CartItem extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const { item, order, product, handleDec, handleInc } = this.props;
        return (
            <div className="cartItem">
                <div className="cartItemInfoLeft">
                    <img className="cartImg" src={product.photo}/>
                    <div>
                        <div>{product.name}</div>
                        <div className="quantityButtons">
                            <Button onClick={()=>handleDec(product, order)}>-</Button>
                            <div className="cartQuantity">{item.quantity}</div>
                            <Button onClick={()=>handleInc(product, order)}>+</Button>
                        </div>
                    </div>
                </div>
                <div className="cartItemPriceRight">
                {item.cost}
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