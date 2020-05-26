import { createStore } from '../lib/redux/redux.min.js';
import rootReducer from './reducer/index.js'
export default createStore(rootReducer);