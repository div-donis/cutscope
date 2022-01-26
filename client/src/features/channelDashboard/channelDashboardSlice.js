import { createSlice } from "@reduxjs/toolkit"; 

const channelDashboardSlice = createSlice({
    name: 'channelDashboard',
    initialState: {
        entities: [], 
        currentEntity: '',
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
      }
    },
})

export const { userChannelAdded, setCurrentChannel, setUserChannels } = channelDashboardSlice.actions;

export default channelDashboardSlice.reducer; 