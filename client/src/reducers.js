import { combineReducers } from "redux";
import channelsReducer from "./features/channels/channelsSlice";


const rootReducer = combineReducers({
  channels: channelsReducer
});

export default rootReducer; 