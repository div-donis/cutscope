import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./features/channels/channelsSlice";
import channelDashboardReducer from './features/channelDashboard/channelDashboardSlice'
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    channelDashboard: channelDashboardReducer,
    user: userReducer,
  },
});

export default store; 