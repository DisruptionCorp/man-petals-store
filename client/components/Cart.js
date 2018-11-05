import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineItem from './cart_components/LineItem';
import { Typography, Card, CardContent } from '@material-ui/core';
import { deleteLineItem } from '../reducers/orderReducer';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { order, items, allProducts, totalCost, handleDelete } = this.props;
    const count = items.reduce((acc, el) => {
      return (acc += el.quantity);
    }, 0);
    const id = order ? order.id : 'loading';
    const tax = totalCost*0.045;
    const total = (totalCost + 3.99 + tax).toFixed(2);
    // console.log('Cart Order is: ', order)
    return (
      <div className="cartContainer">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div >
          <Typography variant="title">Your Order Information</Typography>
          <Typography variant="title">Order #: {id.slice(0,15)}</Typography>
          <Typography variant="title">There are {count} items in your cart.</Typography>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAP3SURBVGhD7dlbqFVFHMfxk0pIWBYWQUQPBYFZaSZEiRY+1EtYlkKXh/BBFLpIZVGJPpgQhEmQgRREUBBlYVHZS2lUXiopk5IgK7ALhVQPXTTt4vcLHvgzzNpr1t5rn3Me9g8+sDlnz6xZa6+ZNTNraJBBBhnxjMf1eBp78RN+xVd4FXfhdIzp3IID+L/GITyGSRhTOQkvIdfoTr7GNIyJnIh3kGtoid9wEUY9G5Fr4C7cjXmYDW+75/A30u9+i1G9zebgP8RGeYVvRFXOxYeIZWSfGbW8idiYPzELdbFPfYRY9i+cir7nBFyBlXgBW/AvYmPuQ2nOx1HE8h/jWdyL1vuNJ3AzvkQ8aOoPNL3PX0GurmE7cTV6zml4C7mDpLaiae5Arq6Uv9JEdJUzUPcrRE+haRwscnXlvA/7VqOMw3vIVejJPQH7w2o8A6ciD6JpvFhv40ncj+Ww7v3IHftlNMrtSCtxzrQAIxEv5K34BWk7FqEoPql/RCz8Hc7BSOcCHERsyxdwAKrNdYgFdSW6yWRcepyfu8lCpO2Zi9p4j8ZC9pWmmY7XEZ8Tfn4NF6NJvPqfI7bpYdTmXcRCPgCbxCvoND3WEfm/G9AkjyLW4YyiNnsQC9npSuPTuNNJDHMqcyFKswSxvNOb2nyAWMghsTRvIJbtxFuvNOmJ+MSvjVPtWKh07HbCdwSxbCd+92SUZD1i2c2ozWLEQq4fzkNdnPXGciUczeoyAa5XYrmHUBs3Bn5HLOgAUDfX6deJrEBazlGxKOuQFvZkzkJVTkHbt9ZNSKf621Ecp+O5+Y6LH58zVVfSDpyWqeIzpSqXw76Zrj5d/1yGRnEoTacH0QNIYxmH1tz3I7+T2z2Zgn3IldFadJUZ+AZpha7LqzbZfNj5y6Vlhvk/p0FV2YRcucdRNMeqyplIf+K6KbtX21sn9hk/+7ep6BQ3J9J+4e3cc5ygxUptkCvHkjgAzDzOz6Wxf8RjvoieswyxUver+p3bEI/pYq7nrEKstJWrUxOXDfGYLrB6jkvQWGmTOVK3uQrxmK5Oe45bnbHS79HT6FGQexCP+Ql6jqNIrFTXokmarA59v+JyNh7P/eVWYgePFfurlKzhnSE8jx9QMq8yaZ+UG+GtJLdutnHzUZVrEKc5h2F/q5p8uunhEjYeQ95Wrd7KVTuO7mmtgRM8V5N+/hS57+pn+FpuKdzacdG0AV6Y9Lv/wFcSrcb7/DOkB+unJqvTRnEV6C587qBt8pe4E32N96tDcm4ymXL0sX9dAtfz6WuInG0oHRhaiduadmjX0y66nH7bcN8nPoLcvX023I51v3gHdsOFki9SXQmOmRejgwwyyCD9zNDQMXWIeGXKjwAIAAAAAElFTkSuQmCC"
               type='image/png'
               style={{ width: "250px", height: "250px"}}/>
        </div>
          <hr />
        <Card style={{ width: '450px'}}>
        <CardContent >
          {items.map(item => {
            item.product = allProducts.find(
              product => product.id == item.productId
            );
            return (
              <LineItem
                key={item.id}
                cost={item.cost}
                item={item}
                orderId={id}
                handleDelete={() => handleDelete(item, id)}
              />
            );
          })}         
        <br />
        <br />
        <br />
        <Typography align="right" variant='headline'> Tax: ${tax.toFixed(2)}</Typography>
        <Typography align="right" variant='headline'> Shipping: $3.99</Typography> 
        <hr />
        <Typography align="right" variant='headline'> Grand Total: ${total}</Typography>
        </CardContent>
        </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, orders }) => {
  const { allProducts } = products;
  console.log('state of orders in mapStateToProps: ', orders);
  const order = orders.find(_order => {
    return _order.status === 'CART';
  });
  const totalCost = order.Item.reduce((total, curr)=>{
    return total += curr.cost*1
  }, 0)

  let items = order ? order.Item : [];
  console.log(totalCost)
  return {
    order,
    items,
    allProducts,
    totalCost,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDelete: (lineItem, orderId) =>
      dispatch(deleteLineItem(lineItem, orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
