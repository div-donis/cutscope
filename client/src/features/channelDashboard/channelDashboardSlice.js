import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 

export const fetchCurrentChannelMessages = createAsyncThunk("/channels/fetchCurrentChannelMessages", async (id) => {
  return fetch(`/api/channels/${id}`)
      .then((res) => res.json())
      .then((data) => data);
}); 

const channelDashboardSlice = createSlice({
    name: 'channelDashboard',
    initialState: {
        entities: [], 
        currentEntity: '',
        currentChannelMessages: [],
        status: 'idle',
    },
    reducers : {
      setUserChannels(state, action) {
        state.entities = action.payload;
      },
      userChannelAdded(state, action) {
        const entityExists = (name) => {
          return state.entities.some(function(el) {
            return el.name === name;
          })
        }
        if(entityExists(action.payload.name)){
          console.log('error, already in channel rack')
        }else{
          state.entities.push(action.payload)
        }    
      },
      setCurrentChannel(state, action) {
        state.currentEntity = action.payload
      },
      addMessage(state, action) {
        state.currentChannelMessages.unshift(action.payload)
      },
    },
    extraReducers: {
      [fetchCurrentChannelMessages.pending](state) {
        state.status = "loading";
      },
      [fetchCurrentChannelMessages.fulfilled](state, action) {
        state.currentChannelMessages = action.payload.messages;
        state.status = "idle";
      },
    },
})

export const { userChannelAdded, setCurrentChannel, setUserChannels, addMessage } = channelDashboardSlice.actions;

export default channelDashboardSlice.reducer; 