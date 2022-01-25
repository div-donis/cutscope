import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./features/channels/channelsSlice";
import userChannelsReducer from './features/userChannels/userChannelsSlice'

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    userChannels: userChannelsReducer
  },
});

export default store; 