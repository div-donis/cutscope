import React from 'react'
import User from './features/user/User'
import Channels from './features/channels/Channels'

import CurrentChannel from './CurrentChannel'
import MessageBoard from './MessageBoard'
import ChannelRack from './ChannelRack'
import './Dashboard.css'

const Dashboard = () => {
    return(
        <div className='dashboard'>
            <div className='left-container'> 
                <User />
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