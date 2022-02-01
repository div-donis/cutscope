import { combineReducers } from "redux";
import channelDashboardReducer from './features/channelDashboard/channelDashboardSlice'
import userReducer from './features/user/userSlice'


const rootReducer = combineReducers({
  channelDashboard: channelDashboardReducer,
  user: userReducer,
});

export default rootReducer; 