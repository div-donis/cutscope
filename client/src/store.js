import { configureStore } from "@reduxjs/toolkit";

import channelsReducer from "./features/channels/channelsSlice";

const store = configureStore({
  reducer: {
    channels: channelsReducer,
  },
});

export default store; 