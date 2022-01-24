import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 

export const fetchChannels = createAsyncThunk("channels/fetchChannels", async () => {
    return fetch(`http://localhost:3000/api/channels`)
        .then((res) => res.json())
        .then((data) => data);
}); 

const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        entities: [], 
        status: "idle",
    },
    reducers : {
        channelAdded(state, action) {
            state.entities.push(action.payload);
        },
    },
    extraReducers: {
        [fetchChannels.pending](state) {
          state.status = "loading";
        },
        [fetchChannels.fulfilled](state, action) {
          state.entities = action.payload;
          state.status = "idle";
        },
      },
})

export const { channelAdded } = channelsSlice.actions;

export default channelsSlice.reducer; 