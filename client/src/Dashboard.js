import React from 'react'
import User from './User'
import Channels from './features/channels/Channels'
import CurrentChannel from './CurrentChannel'
import MessageBoard from './MessageBoard'
import ChannelRack from './ChannelRack'
import './Dashboard.css'

const Dashboard = ( { onLogOut, user }) => {

    return(
        <div className='dashboard'>
            <div className='left-container'> 
                <User onLogOut={onLogOut} user={user}/>
                <Channels />
            </div>
            <div className='right-container'> 
                <CurrentChannel /> 
                <MessageBoard />
                <ChannelRack />
            </div>
        </div>
    )
}
export default Dashboard