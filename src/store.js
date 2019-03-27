import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './reducers/login';
import adventureReducer from './reducers/createAdvenutre'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  combineReducers({
    form: formReducer,
    login: loginReducer,
    adventure: adventureReducer
    }), 
    composeEnhancers(applyMiddleware(thunk)));

export default store;
