import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { productReducer } from './reducers/productReducer';
import { orderReducer } from './reducers/orderReducer';
import { authReducer } from './reducers/authReducer';
import { imageReducer } from './reducers/imageReducer';

const reducer = combineReducers({
  products: productReducer,
  orders: orderReducer,
  auth: authReducer,
  image: imageReducer,
});

export const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
