import { configureStore } from "@reduxjs/toolkit";
import channelDashboardReducer from './features/channelDashboard/channelDashboardSlice'
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    channelDashboard: channelDashboardReducer,
    user: userReducer,
  },
});

export default store; 