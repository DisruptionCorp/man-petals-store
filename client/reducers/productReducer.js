import axios from 'axios';

//initial state
const initialState = {
  allProducts: [],
  pageProducts: [],
};

//action name
const GET_PRODUCTS_BY_PAGE = 'GET_PRODUCTS_BY_PAGE';
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_TAGS = 'GET_TAGS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DESTROY_PRODUCT = 'DESTROY_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//action creator
const _getProductsByPage = products => ({
  type: GET_PRODUCTS_BY_PAGE,
  products,
});
const _getProducts = products => ({ type: GET_PRODUCTS, products });
const _createProduct = product => ({ type: CREATE_PRODUCT, product });
const _destroyProduct = product => ({ type: DESTROY_PRODUCT, product });
const _updateProduct = product => ({ type: UPDATE_PRODUCT, product });

//thunks
export const getProductsByPage = (index = 1) => {
  return dispatch => {
    return axios
      .get(`/api/products/page/${index}`)
      .then(resp => {
        dispatch(_getProductsByPage(resp.data));
      })
      .catch(console.error.bind(console));
  };
};

export const getProducts = () => {
  return dispatch => {
    return axios
      .get(`/api/products`)
      .then(resp => {
        dispatch(_getProducts(resp.data));
      })
      .catch(console.error.bind(console));
  };
};

export const createProduct = product => dispatch =>
  axios
    .post('/api/products', product)
    .then(resp => dispatch(_createProduct(resp.data)));

export const destroyProduct = product => dispatch =>
  axios
    .delete(`/api/products/:${product.id}`)
    .then(() => dispatch(_destroyProduct(product)));

export const updateProduct = product => dispatch =>
  axios
    .put(`/api/products/:${product.id}`, product)
    .then(resp => dispatch(_updateProduct(resp.data)));

export const getProductsByTags = tags => dispatch =>
  axios
    .post('/api/products/search/tags', { tags })
    .then(response => dispatch(_getProducts(response.data)));

//reducer
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_PAGE:
      return { ...state, pageProducts: action.products };

    case GET_PRODUCTS:
      return { ...state, allProducts: action.products };

    case CREATE_PRODUCT:
      return { ...state, allProducts: [...state.allProducts, action.product] };

    case UPDATE_PRODUCT:
      const updatedProducts = state.allProducts.map(
        product => (product.id === action.product.id ? action.product : product)
      );
      return { ...state, allProducts: updatedProducts };

    case DESTROY_PRODUCT:
      const destroyedProducts = state.allProducts.filter(
        product => product.id !== action.product.id
      );
      return { ...state, allProducts: destroyedProducts };

    default:
      return state;
  }
};
