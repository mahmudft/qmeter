import { createStore } from "redux";
import mainReducer from './reducer';

let store = createStore(mainReducer)

export default store;