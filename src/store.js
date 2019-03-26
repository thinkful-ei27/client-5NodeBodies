import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './reducers/login';
import thunk from 'redux-thunk';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;


const store = createStore(
  combineReducers({
    form: formReducer,
    login: loginReducer,
    }), 
    composeEnhancers(applyMiddleware(thunk)));

export default store;
