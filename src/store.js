import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { loadAuthToken } from './utils/local-storage'
import adventureReducer from './reducers/createAdventure'
import nodeReducer from './reducers/nodes'
import { reducer as loginReducer } from './reducers/auth';
import studentReducer from './reducers/student';
import thunk from 'redux-thunk';
import { setAuthToken, refreshAuthToken } from './actions/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  combineReducers({
    form: formReducer,
    auth: loginReducer,
    adventure: adventureReducer,
    node: nodeReducer,
    student: studentReducer
  }),
  composeEnhancers(applyMiddleware(thunk)));

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
