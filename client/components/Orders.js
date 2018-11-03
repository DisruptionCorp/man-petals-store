import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteOrder } from '../reducers/orderReducer';

class Orders extends Component {
  render() {
    const { completeOrders, allProducts, deleteOrder } = this.props;
    return (
      <div>
        {completeOrders.map(order => {
          const items = order.Item ? order.Item : [];
          return (
            <div key={order.id}>
              <p>Order ID: {order.id}</p>
              <div>
                <ul>
                  {items.map(item => {
                    const productName = allProducts.find(
                      p => p.id == item.productId
                    ).name;
                    return (
                      <li key={item.id}>
                        {item.quantity} x {productName}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button onClick={() => deleteOrder(order.id)}>
                Delete Order
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ orders, products }) => {
  const { allProducts } = products;
  const completeOrders = orders.filter(o => o.status != 'CART');
  return {
    completeOrders,
    allProducts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOrder: orderId => dispatch(deleteOrder(orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
