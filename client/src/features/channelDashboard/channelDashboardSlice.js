import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 

export const fetchChannels = createAsyncThunk("/channels/fetchChannels", async (name) => {
  return fetch(`/api/channels/by_name/${name}`)
      .then((res) => res.json())
      .then((data) => data);
}); 

export const fetchChannelMessages = createAsyncThunk("/channels/fetchChannelMessages", async (id) => {
  return fetch(`/api/channel_with_messages/${id}`)
      .then((res) => res.json())
      .then((data) => data);
})

const channelDashboardSlice = createSlice({
    name: 'channelDashboard',
    initialState: {
        channels: [],
        channelsStatus: 'idle', 
        userChannels: [],
        currentChannel: '',
        channelMessages: [],
        channelMessagesStatus: 'idle'
    },
    reducers : {
      setUserChannels(state, action) {
        state.userChannels = action.payload;
      },
      userChannelAdded(state, action) {
        const entityExists = (name) => {
          return state.userChannels.some(function(el) {
            return el.name === name;
          })
        }
        if(entityExists(action.payload.name)){
          console.log('error, already in channel rack')
        }else{
          state.userChannels.push(action.payload)
        }    
      },
      setCurrentChannel(state, action) {
        state.currentChannel = action.payload
      },
      addMessage(state, action) {
        state.channelMessages.unshift(action.payload)
      },
    },
    extraReducers: {
      [fetchChannelMessages.pending](state) {
        state.channelMessagesStatus = "loading";
      },
      [fetchChannelMessages.fulfilled](state, action) {
        state.channelMessages = action.payload.messages
        state.channelMessagesStatus = "idle";
      },
      [fetchChannels.pending](state) {
        state.ChannelsStatus = "loading";
      },
      [fetchChannels.fulfilled](state, action) {
        state.channels = action.payload;
        state.channelStatus = "idle";
      },
    },
})

export const { 
  userChannelAdded, 
  setCurrentChannel, 
  setUserChannels, 
  addMessage, 
} = channelDashboardSlice.actions;

export default channelDashboardSlice.reducer; 