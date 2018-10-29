import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementLineItem, decrementLineItem } from '../reducers/orderReducer'

//presentation components
import Product from './home_components/Product';

class Home extends Component {
    render() {
        const { products, order } = this.props;
        const id = (order) ? order.id : '';
        const items = (order) ? order.Item : [];
        const count = items.reduce((acc, el) => {
            return acc += el.quantity;
        }, 0)
        console.log('cart-order')
        console.log(order)
        return (
            <div>
                <h1>Welcome to Disrupt Co {'{'}<span style={{color: 'grey'}}>Grace Shopper</span>{'}'}</h1>
                <div>
                    Your Order ID is ({id}).
                </div>
                <div>
                    Your cart contains {count} items.
                    {/*items.map(item => {
                        return (<div key={item.productId}>{item.productId}: #{item.quantity}</div>)
                    })*/}
                </div>
                <hr />
                <div>
                    <h2>Products</h2>
                    {products.map(_product => {
                        return <Product key={_product.id} product={_product} order={order}/>
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ products, orders }) => {
    console.log('/home orders:')
    console.log(orders)
    const order = orders.find(_order => _order.status === 'CART');
    return {
        products,
        order
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleIncrement: (product, order) => dispatch(incrementLineItem(product, order)),
        handleDecrement: (product, order) => dispatch(decrementLineItem(product, order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
