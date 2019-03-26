import { createStore } from 'redux';
import loginReg from './reducers/loginreg';

const store = createStore(loginReg);

export default store;