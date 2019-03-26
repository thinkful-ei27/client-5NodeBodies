import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import loginReg from './reducers/loginreg';
import thunk from 'redux-thunk';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;


const store = createStore(combineReducers({loginReg: loginReg}), composeEnhancers(applyMiddleware(thunk)));

export default store;
