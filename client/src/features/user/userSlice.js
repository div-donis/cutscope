import { createSlice } from "@reduxjs/toolkit"; 

const userSlice = createSlice({
    name: 'user',
    initialState: {
        entity: '', 
        status: '',
        menuActive: false
    },
    reducers : {
       setUser(state, action) {
            state.entity = action.payload
       },
       setStatus(state, action) {
           state.status = action.payload
       },
       toggleMenu(state, action) {
            state.menuActive = action.payload
       }
    },
})

export const { setUser, setStatus, toggleMenu } = userSlice.actions;

export default userSlice.reducer; 