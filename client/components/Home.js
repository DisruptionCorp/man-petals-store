import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const id = (this.props.order) ? this.props.order.id : '--';

        return (
            <div>
                <h1>Welcome to Disrupt Co {'{'}<span style={{color: 'grey'}}>Grace Shopper</span>{'}'}</h1>
                <div>
                    Your Order/Cart ID is ({id}).
                </div>
                <hr />
                <div>
                    <h2>Products</h2>
                    {this.props.products.map(product => {
                        return (
                        <div className="product-container" key={product.id}>
                        <div className="product-home">
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                        </div>
                        </div>
                    )})}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ products, orders }) => {
    // console.log('Products are: ', products)
    const order = orders.find(_order => {
        console.log(_order)
        return (_order.status === 'CART') 
    });
    console.log('Order is: ', order);

    return {
        products,
        order
    };
}

export default connect(mapStateToProps)(Home);

