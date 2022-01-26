import { combineReducers } from "redux";
import channelsReducer from "./features/channels/channelsSlice";
import channelDashboardReducer from './features/channelDashboard/channelDashboardSlice'
import userReducer from './features/user/userSlice'


const rootReducer = combineReducers({
  channels: channelsReducer,
  channelDashboard: channelDashboardReducer,
  user: userReducer,
});

export default rootReducer; 