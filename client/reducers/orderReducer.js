import axios from 'axios'

//intiial state
const initialState = []

//action name
const GET_ORDERS = 'GET_ORDERS'

//action creator
const _getOrders = (orders) => {
    return {
        type: GET_ORDERS,
        orders
    }
}

//thunks
export const getOrders = () => {
    return (dispatch) => {
        return axios
            .get('/api/orders')
            .then(resp => dispatch(_getOrders(resp.data)))
            .catch(console.error.bind(console))
    }
}

//reducer
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_ORDERS:
        return state = action.orders
    default:
        return state
    }
}
