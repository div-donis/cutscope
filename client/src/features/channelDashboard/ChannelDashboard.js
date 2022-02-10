import React from 'react'
import CurrentChannel from './CurrentChannel'
import MessageBoard from './MessageBoard'
import './ChannelDashboard.css'
import MessageInput from './MessageInput'

const ChannelDashboard = () => {

    return(
        <div className='channel-dashboard'>
            <CurrentChannel /> 
            <MessageBoard />
            <MessageInput />
        </div>
    )
}
export default ChannelDashboard