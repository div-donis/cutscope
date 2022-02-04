import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { useSelector } from "react-redux";

export const fetchChannels = createAsyncThunk("/channels/fetchChannels", async (name) => {
  return fetch(`/api/channels/by_name/${name}`)
      .then((res) => res.json())
      .then((data) => data);
}); 

export const fetchCurrentChannelMessages = createAsyncThunk("/channels/fetchCurrentChannelMessages", async (id) => {
  return fetch(`/api/messages/by_channel/${id}`)
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
        currentChannelMessages: [],
        currentChannelMessagesStatus: 'idle'
    },
    reducers : {
      channelAdded(state, action) {
        state.channels.push(action.payload);
      },
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
        state.currentChannelMessages.unshift(action.payload)
      },
      upVote(state, action){
        state.currentChannelMessages.find((x) => x.id === action.payload).votes++
      }
    },
    extraReducers: {
      [fetchCurrentChannelMessages.pending](state) {
        state.currentChannelMessagesStatus = "loading";
      },
      [fetchCurrentChannelMessages.fulfilled](state, action) {
        state.currentChannelMessages = action.payload
        state.currentChannelMessagesStatus = "idle";
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
  channelAdded,
  incrementMessageQuery,
  upVote
} = channelDashboardSlice.actions;

export default channelDashboardSlice.reducer; 