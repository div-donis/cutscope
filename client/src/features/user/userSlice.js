import { createSlice } from "@reduxjs/toolkit"; 

const userSlice = createSlice({
    name: 'user',
    initialState: {
        entity: '', 
        status: ''
    },
    reducers : {
       setUser(state, action) {
            state.entity = action.payload
       },
       setStatus(state, action) {
           state.status = action.payload
       }
    },
})

export const { setUser, setStatus } = userSlice.actions;

export default userSlice.reducer; 