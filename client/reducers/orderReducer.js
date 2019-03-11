import axios from 'axios';

//intiial state
const initialState = [];

//action name
const GET_ORDERS = 'GET_ORDERS';
const GET_ORDER = 'GET_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const CREATE_ORDER = 'CREATE_ORDER';

// const CREATE_LINEITEM = 'CREATE_LINEITEM';
// const UPDATE_LINEITEM = 'UPDATE_LINEITEM';

//action creator
const _getOrders = orders => ({
    type: GET_ORDERS,
    orders,
});

const _getOrder = order => ({
    type: GET_ORDER,
    order,
})

// const _createLineItem = lineItem => ({
//     type: CREATE_LINEITEM,
//     lineItem,
// });

// const _updateLineItem = lineItem => ({
//     type: UPDATE_LINEITEM,
//     lineItem,
// });

// THUNKS
export const getOrders = () => {
  return dispatch => {
    return axios
      .get('/api/orders/')
      .then(resp => dispatch(_getOrders(resp.data)))
      .catch(console.error.bind(console));
  };
};

export const getOrder = id => {
  return dispatch => {
    return axios
      .get(`/api/orders/${id}`)
      .then(resp => dispatch(_getOrder(resp.data)))
      .catch(console.error.bind(console));
  };
};

//Increment and decrement lineitems, creating and deleting as needed
export const incrementLineItem = (product, order) => {
  // product = product associated to item to be created or update, order = order attached to line item
  let lineItem = order.Item.find(item => item.productId == product.id);
  return dispatch => {
    // if item is in order, increment/update its cost
    if (lineItem) {
      lineItem.quantity+=1;
      lineItem.cost = lineItem.quantity * parseFloat(product.price);
      dispatch(updateLineItem(lineItem, order.id));
    }
    // else, create new item 
    else {
      lineItem = {
        orderId: order.id,
        productId: product.id,
        cost: product.price,
        quantity: 1,
        product,
      };
      dispatch(createLineItem(lineItem, order.id));
    }
  };
};

export const decrementLineItem = (product, order) => {
  let lineItem = order.Item.find(item => item.productId === product.id);
  return dispatch => {
    if (lineItem) {
      if (lineItem.quantity > 1) {
        lineItem.quantity--;
        lineItem.cost -= product.price;
        dispatch(updateLineItem(lineItem, order.id));
      } 
      else if (lineItem.quantity === 1) {
        dispatch(deleteLineItem(lineItem, order.id));
      }
    }
  };
};

// create, update, or delete, then get order associated to lineitem and edit redux store
// by replacing newly edited order
const createLineItem = (lineItem, orderId) => {
  return dispatch => {
    return axios
      .post(`/api/lineItems/${orderId}`, { lineItem })
      .then(() => dispatch(getOrder(orderId)))
      .catch(console.error.bind(console));
  };
};

const updateLineItem = (lineItem, orderId) => {
  return dispatch => {
    return axios
      .put(`/api/lineItems/${lineItem.id}`, { lineItem, orderId })
      .then(() => dispatch(getOrder(orderId)))
      .catch(console.error.bind(console));
  };
};

export const deleteLineItem = (lineItem, orderId) => {
  return dispatch => {
    return axios
      .delete(`/api/lineItems/${orderId}/${lineItem.id}`)
      .then(() => dispatch(getOrder(orderId)))
      .catch(console.error.bind(console));
  };
};

// create or delete order
export const deleteOrder = orderId => {
  return dispatch => {
    return axios
      .delete(`/api/orders/${orderId}`)
      .then(() => dispatch(_deleteOrder(orderId)))
      .catch(console.error.bind(console));
  };
};

export const createOrder = order => {
  return dispatch => {
    return axios
      .put(`/api/orders/${order.id}`, { ...order, status: 'ORDER' })
      .then(() => dispatch(getOrders()))
      .catch(console.error.bind(console));
  };
};

//reducer
export const orderReducer = (state = initialState, action) => {
  // simplified logic here:
  // prior to this, complex lineitem logic was written so that each time an individual lineitem was edited
  // db would be queried to return the individual item
  // then we'd edit the item in our order.Item list when the list itself was already edited in our db
  // we simply had to query to return the entire order, which is what the logic is currently
  // after each edit, ajax call is made to db to get the newly edited order and replacing it in our reducer here
  switch (action.type) {
    case GET_ORDERS:
      return (state = action.orders);

    case GET_ORDER:
      // attempted to sort items by createdAt so that each time quantity is updated, cart item order remains the same
      // logic also in the backend atm but neither is working
      action.order.Item = action.order.Item.sort((a,b) => a.createdAt-b.createdAt)
      let orders = state.reduce((all, order) => {
        if (order.status == "CART") {
          return [...all, action.order]
        } else {
          return [...all, order]
        }
      }, [])
      return orders;

    case DELETE_ORDER:
      const _orders = state.filter(o => o.id != action.orderId);
      return _orders;
    default:
      return state;
  }
};
