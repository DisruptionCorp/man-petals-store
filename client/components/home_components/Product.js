import React from 'react';
import { connect } from 'react-redux'



const Product = ({ product, order, _handleIncrement, _handleDecrement }) => {
    let disableDecButton;  
    if (order) {
        disableDecButton = ( 'Item' in order ) ? (!order.Item.find(item => item.productId == product.id)) : true;
    }
  
    return (  
        <div className="product-container" key={product.id}>
            <div className="product-name-price">
                <h2>{product.name}</h2>
                <p>{product.price}</p>
            </div>
            <div className="product-buttons">
                <button onClick={_handleIncrement}> + </button>
                <button onClick={_handleDecrement} disabled={disableDecButton}> - </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state, { product, order, handleIncrement, handleDecrement }) => {
    return {
        product,
        order,
        _handleIncrement: ()=> handleIncrement(product, order), 
        _handleDecrement: ()=> handleDecrement(product, order)
    }
}

export default connect(mapStateToProps)(Product);

  