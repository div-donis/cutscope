import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 

export const fetchUserChannels = createAsyncThunk("userChannels/fetchUserChannels", async () => {
    return fetch(`http://localhost:3000/api/channels`)
        .then((res) => res.json())
        .then((data) => data);
}); 

const userChannelsSlice = createSlice({
    name: 'userChannels',
    initialState: {
        entities: [], 
        status: "idle",
    },
    reducers : {
        userChannelAdded(state, action) {
            state.entities.push(action.payload);
        },
    },
    extraReducers: {
        [fetchUserChannels.pending](state) {
          state.status = "loading";
        },
        [fetchUserChannels.fulfilled](state, action) {
          state.entities = action.payload;
          state.status = "idle";
        },
      },
})

export const { userChannelAdded } = userChannelsSlice.actions;

export default userChannelsSlice.reducer; 