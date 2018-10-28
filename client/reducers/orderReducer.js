import axios from 'axios'

//intiial state
const initialState = []

//action name
const GET_ORDERS = 'GET_ORDERS'
const CREATE_LINEITEM = 'CREATE_LINEITEM'
const UPDATE_LINEITEM = 'UPDATE_LINEITEM'
const DELETE_LINEITEM = 'DELETE_LINEITEM'

//action creator
const _getOrders = (orders) => {
    return {
        type: GET_ORDERS,
        orders
    }
}

const _createLineItem= (lineItem) => {
    return {
        type: CREATE_LINEITEM,
        lineItem
    }
}

const _updateLineItem= (lineItem) => {
    return {
        type: UPDATE_LINEITEM,
        lineItem
    }
}

const _deleteLineItem= (lineItem) => {
    return {
        type: DELETE_LINEITEM,
        lineItem
    }
}

//thunks
export const getOrders = () => {
    return (dispatch) => {
        return axios
            .get('/api/orders/')
            .then(resp => dispatch(_getOrders(resp.data)))
            .catch(console.error.bind(console))
    }
}

//Increment and decrement lineitems, creating and deliting as needed
export const incrementLineItem = (product, order) => { 
    let lineItem = order.Item.find(item => item.productId === product.id);
    console.log('lineItem at increment is: ', lineItem)

    return (dispatch) => {
        if (lineItem) {
            lineItem.quantity++;
            dispatch(updateLineItem(lineItem, order.id))
        }
        else { 
            lineItem = {orderId: order.id, productId: product.id}
            console.log('the lineItem created is: ', lineItem);
            dispatch(createLineItem(lineItem, order.id))
        }
    }
}

export const decrementLineItem = (product, order) => {
    let lineItem = order.Item.find(item => item.productId === product.id);
    console.log('the lineitem at decrement is: ', lineItem)

    return (dispatch) => {
        if(lineItem) {
            if (lineItem.quantity > 1) {
                lineItem.quantity--;
                dispatch(updateLineItem(lineItem, order.id))
            }
            else if (lineItem.quantity === 1) { 
                console.log('the lineItem deleted is: ', lineItem);
                dispatch(deleteLineItem(lineItem, order.id))
            }
        }
    }
}

const createLineItem = (lineItem, orderId) => {
    return (dispatch) => {
        return axios
            .post(`/api/orders/${orderId}/lineItems`, lineItem)
            .then(resp => dispatch(_createLineItem(resp.data)))
            .catch(console.error.bind(console))
    }
}

const updateLineItem = (lineItem, orderId) => {
    return (dispatch) => {
        return axios   
            .put(`/api/orders/${orderId}/lineItems/${lineItem.id}`, lineItem)
            .then(resp => dispatch(_updateLineItem(resp.data)))
            .catch(console.error.bind(console))
    }
}

const deleteLineItem = (lineItem, orderId) => {
    return (dispatch) => {
        return axios
            .delete(`/api/orders/${orderId}/lineItems/${lineItem.id}`)
            .then(()=> dispatch(_deleteLineItem(lineItem, orderId)))
            .catch(console.error.bind(console))
    }
}



//reducer
export const orderReducer = (state = initialState, action) => {
    console.log('state in reducer is: ', state);
    const orderIdx = state.findIndex((_order) => { return _order.id === action.lineItem.orderId}); 
    console.log('orderIdx is: ', orderIdx);
    // 
    // console.log('lineItemIdx is: ', lineItemIdx)

    switch (action.type) {
    case GET_ORDERS:
        return state = action.orders;
    case CREATE_LINEITEM:
        state[orderIdx].Item.push(action.lineItem);
        return state;
    case UPDATE_LINEITEM:
        state[orderIdx].Item[action.lineItem.id] = action.lineItem;
        return state;
    case DELETE_LINEITEM:
        const lineItemIdx = state[orderIdx].Item.findIndex((_item) => { return _item.id === action.lineItem.id});
        state[orderIdx] = state[orderIdx].Item.splice(lineItemIdx, 1);
        return state;
    default:
        return state
    }
} 
