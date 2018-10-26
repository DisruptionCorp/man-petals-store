import axios from 'axios'

//initial state
const initialState = []

//action name
const GET_PRODUCTS = 'GET_PRODUCTS'

//action creator
const _getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
}

//thunks
export const getProducts = () => {
    return dispatch => {
        return axios
            .get('/api/products')
            .then(resp => dispatch(_getProducts(resp.data)))
            .catch(console.error.bind(console))
    }
}

//reducer
const productReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_PRODUCTS:
        return action.products;

    default:
        return state;
    }
}

export default productReducer
