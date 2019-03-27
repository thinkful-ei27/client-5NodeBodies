import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as loginReducer } from './reducers/auth';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  combineReducers({
    form: formReducer,
    auth: loginReducer,
  }),
  composeEnhancers(applyMiddleware(thunk)));

export default store;
