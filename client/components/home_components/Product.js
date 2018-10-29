import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementLineItem, decrementLineItem } from '../../reducers/orderReducer'


class Product extends Component {
    render() {
        const { product, order, itemQuantity, handleInc, handleDec } = this.props
        return (
            <div className="product-container">
                <h4>{product.name}</h4>
                Price: {product.price? `$${product.price}` : 'tbd'}<br/>
                {itemQuantity} units in cart<br/>
                <div className="product-buttons">
                    <button onClick={()=>handleInc(product,order)}> + </button>
                    <button onClick={()=>handleDec(product,order)} disabled={!itemQuantity}> - </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, { order, product }) => {
    let item = (order) ? order.Item.find(item => item.productId === product.id) : null
    return {
        order,
        product,
        itemQuantity: item ? item.quantity : 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInc: (product, order) => {
            dispatch(incrementLineItem(product, order))
        },
        handleDec: (product, order) => {
            dispatch(decrementLineItem(product, order))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
