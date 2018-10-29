import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementLineItem, decrementLineItem } from '../reducers/orderReducer'

//presentation components
import Product from './home_components/Product';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        const { order } = this.props;
        const id = (this.props.order) ? this.props.order.id : '--';
        const items = (this.props.order) ? this.props.order.Item : [];
        const count = items.reduce((acc, el) => {
            return acc+= el.quantity;
        }, 0)

        return (
            <div>
                <h1>Welcome to Disrupt Co {'{'}<span style={{color: 'grey'}}>Grace Shopper</span>{'}'}</h1>
                <div>
                    Your Order ID is ({id}).
                </div>
                <div>
                    Your cart contains {count} items.
                    {items.map(item => {
                        return (<div key={item.productId}>{item.productId}: #{item.quantity}</div>)
                    })}
                </div>
                <hr />
                <div>
                    <h2>Products</h2>
                    {this.props.products.map(_product => { 
                        return <Product key={_product.id} product={_product} order={order} handleIncrement={this.props.handleIncrement} handleDecrement={this.props.handleDecrement} />
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ products, orders }) => {
    const order = orders.find(_order => {
        return (_order.status === 'CART') 
    });
    return {
        products, order
    };
}

const mapDispatchToProps = (dispatch, ) => {
    return {
        handleIncrement: (product, order)=> dispatch(incrementLineItem(product, order)), 
        handleDecrement: (product, order)=> dispatch(decrementLineItem(product, order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

