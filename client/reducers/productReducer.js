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
const _getProducts = products => ({ type: GET_PRODUCTS, products });
const _createProduct = product => ({ type: CREATE_PRODUCT, product });
const _destroyProduct = product => ({ type: DESTROY_PRODUCT, product });
const _updateProduct = product => ({ type: UPDATE_PRODUCT, product });

//thunks
export const getProducts = () => dispatch =>
  axios
    .get('/api/products')
    .then(resp => dispatch(_getProducts(resp.data)))
    .catch();

export const createProduct = product => dispatch =>
  axios
    .post('/api/products', product)
    .then(resp => dispatch(_createProduct(resp.data)));

export const destroyProduct = product => dispatch =>
  axios
    .post(`/api/products/:${product.id}`)
    .then(() => dispatch(_destroyProduct(product)))
    .catch();

export const updateProduct = product => dispatch =>
  axios
    .put(`/api/products/:${product.id}`, product)
    .then(resp => dispatch(_updateProduct(resp.data)))
    .catch();

export const getProductsByTags = tags => dispatch =>
  axios
    .post('/api/products/search/tags', { tags })
    .then(response => dispatch(_getProducts(response.data)))
    .catch();

//reducer
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      state = action.products;
      break;

    case CREATE_PRODUCT:
      state = [...state, action.product];
      break;

    case UPDATE_PRODUCT:
      state = state.map(
        product => (product.id === action.product.id ? action.product : product)
      );
      break;

    case DESTROY_PRODUCT:
      state = state.filter(product => product.id !== action.product.id);
      break;

    default:
      return state;
  }
  return state;
};
