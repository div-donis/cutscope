import React from 'react'
import User from './features/user/User'
import Channels from './features/channels/Channels'
import ChannelDashboard from './features/channelDashboard/ChannelDashboard'
import './Dashboard.css'

const Dashboard = ( { onLogOut, user }) => {

    return(
        <div className='dashboard'>
            <div className='left-container'> 
                <User onLogOut={onLogOut} user={user}/>
                <Channels />
            </div>
            <div className='right-container'> 
                <ChannelDashboard />
            </div>
        </div>
    )
}
export default Dashboard