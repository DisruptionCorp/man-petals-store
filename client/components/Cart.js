import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineItem from './cart_components/LineItem'

import { deleteLineItem } from '../reducers/orderReducer'

class Cart extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const  { order, items, products } = this.props;
        const count = items.reduce((acc, el) => {
            return acc+= el.quantity;
        }, 0);
        const id = order ? order.id : 'loading';

        // console.log('Cart Order is: ', order)
        return (
            <div className="cart-container">
                <div className="cart">
                    <h2>Your Order Information</h2>
                    <h3>Order #: {id}</h3>
                    <h3>There are {count} items in your cart.</h3>
                    <hr />
                        {items.map(item => {
                            item.product = this.props.products.find(product => product.id == item.productId)   
                             return (<LineItem key={item.id} item={item} orderId={id} handleDelete={()=> this.props.handleDelete(item, id)}/>)
                        })}
                </div>
            </div>
        )

    }
}

const mapStateToProps = ({ products, orders }) => {
    console.log('state of orders in mapStateToProps: ', orders);
    const order = orders.find(_order => {
        return (_order.status === 'CART') 
    });
    
    let items = order ? order.Item : [];

    return {
       order,
       items, 
       products
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleDelete: (lineItem, orderId)=>  dispatch(deleteLineItem(lineItem, orderId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)