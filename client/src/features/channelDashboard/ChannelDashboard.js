import React from 'react'
import CurrentChannel from './CurrentChannel'
import MessageBoard from './MessageBoard'
import ChannelRack from './ChannelRack'
import './ChannelDashboard.css'

const ChannelDashboard = () => {

    return(
        <div className='channel-dashboard'>
            <CurrentChannel /> 
            <MessageBoard />
            <ChannelRack />
        </div>
    )
}
export default ChannelDashboard