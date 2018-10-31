import axios from 'axios'

//initial state
const initialState = []

//action name
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_TAGS = 'GET_TAGS';

//action creator
const _getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
}

export const _getTags = search => ({
  type: GET_TAGS,
  tags: getTags(products)
})

//thunks
export const getProducts = () => {
    return (dispatch) => {
        return axios
            .get('/api/products')
            .then(resp => dispatch(_getProducts(resp.data)))
            .catch(console.error.bind(console))
    }
}


//reducer
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_PRODUCTS:
        console.log('products loaded: "', action.products);
        return state = action.products;

    default:
        return state;
    }
}

// utils
const getTags = (search) => {
  return products.reduce((acc, curr) => {
    return curr.tags ? 
    [...acc, ...curr.tags.map(each => tags.push(each))] :
    [...acc]
  }, [])
} 

// export default productReducer
