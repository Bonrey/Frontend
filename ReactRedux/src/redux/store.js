import { createStore } from "redux";
import messageReducer from './messages/messages.reducer';

const store = createStore(messageReducer);
export default store;
