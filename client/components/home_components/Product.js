import React from 'react';
import { connect } from 'react-redux'

import { incrementLineItem, decrementLineItem } from '../../reducers/orderReducer'

const Product = ({ product, order, handleIncrement, handleDecrement }) => {
    // const lineItem = (order) ? order.Item.find(item => item.productId === product.id) : false;
  
    return (  
        <div className="product-container" key={product.id}>
            <div className="product-name-price">
                <h2>{product.name}</h2>
                <p>{product.price}</p>
            </div>
            <div className="product-buttons">
                <button onClick={handleIncrement}> + </button>
                <button onClick={handleDecrement}> - </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state, { product, order }) => {
    return {
        product,
        order
    }
}

const mapDispatchToProps = (dispatch, { product, order }) => {
    return {
        handleIncrement: (ev)=> dispatch(incrementLineItem(product, order)), 
        handleDecrement: ()=> dispatch(decrementLineItem(product, order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

  