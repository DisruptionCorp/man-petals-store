import axios from 'axios';

//initial state
const initialState = [];

//action name
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_TAGS = 'GET_TAGS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DESTROY_PRODUCT = 'DESTROY_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//action creator
const _getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};


const _createProduct = product => ({ type: CREATE_PRODUCT, product });

const _destroyProduct = product => ({ type: DESTROY_PRODUCT, product });

const _updateProduct = product => ({ type: UPDATE_PRODUCT, product });

//thunks
export const getProducts = (index=1) => {
  return dispatch => {
    console.log(index)
    return axios
      .get(`/api/products/page/${index}`)
      .then(resp => {
        console.log(resp.data);
        dispatch(_getProducts(resp.data)) })
      .catch(console.error.bind(console));
  };
};

export const createProduct = product => dispatch =>
  axios
    .post('/api/products', product)
    .then(resp => dispatch(_createProduct(resp.data)))
    .catch(console.error.bind(console));

export const getProductsByTags = tags => dispatch => {
    return axios
            .post('/api/products/search/tags', {tags})
            .then(response => dispatch(_getProducts(response.data)))
            .catch(console.error.bind(console))
}


export const destroyProduct = product => dispatch =>
  axios
    .post(`/api/products/:${product.id}`)
    .then(resp => dispatch(_destroyProduct(resp.data)))
    .catch(console.error.bind(console));

export const updateProduct = product => dispatch =>
  axios
    .put(`/api/products/:${product.id}`, product)
    .then(resp => dispatch(_updateProduct(resp.data)))
    .catch(console.error.bind(console));

//reducer
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log('products loaded: "', action.products);
      return (state = action.products);

    case CREATE_PRODUCT:
      state = [...state, action.product];
      break;

    case UPDATE_PRODUCT:
      //   state = state.filter(product => product.id !== action.product.id);
      //   state = [...state, action.product];
      state = state.map(
        product => (product.id === action.product.id ? action.product : product)
      );
      break;

    case DESTROY_PRODUCT: {
      state = state.filter(product => product.id !== action.product.id);
      break;
    }

    default:
      return state;
  }
};

// utils

// export default productReducer
