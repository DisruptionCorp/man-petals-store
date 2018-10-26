import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { productReducer } from './reducers/productReducer';
import { orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products: productReducer,
    orders: orderReducer,
});


export const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
