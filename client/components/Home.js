import React, { Component } from 'react';
import { connect } from 'react-redux';

//presentation components
import Product from './home_components/Product';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { order } = this.props;
        const id = (this.props.order) ? this.props.order.id : '--';
        const items = (this.props.order) ? this.props.order.Item : [];

        return (
            <div>
                <h1>Welcome to Disrupt Co {'{'}<span style={{color: 'grey'}}>Grace Shopper</span>{'}'}</h1>
                <div>
                    Your Order ID is ({id}).
                </div>
                <div>
                    Your cart contains:
                    {items.map(item => {
                        return (<div>{item.id}</div>)
                    })}
                </div>
                <hr />
                <div>
                    <h2>Products</h2>
                    {this.props.products.map(_product => { 
                        return <Product key={_product.id} product={_product} order={this.props.order}/>
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ products, orders }) => {
    // console.log('Products are: ', products)
    const order = orders.find(_order => {
        return (_order.status === 'CART') 
    });

    return {
        products,
        order
    };
}

export default connect(mapStateToProps)(Home);


// {(this.props.order) ? this.props.order.Item.length : '--'}
