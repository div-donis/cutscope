import { combineReducers } from "redux";
import channelsReducer from "./features/channels/channelsSlice";
import userChannelsReducer from './features/userChannels/userChannelsSlice'


const rootReducer = combineReducers({
  channels: channelsReducer,
  userChannels: userChannelsReducer
});

export default rootReducer; 