import { createSlice } from "@reduxjs/toolkit"; 

const userSlice = createSlice({
    name: 'user',
    initialState: {
        entity: '', 
    },
    reducers : {
       setUser(state, action) {
            state.entity = action.payload
       }
    },
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer; 