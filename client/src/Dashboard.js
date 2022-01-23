import React from 'react'
import User from './User'
import Channels from './Channels'
import NewChannel from './NewChannel'
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
                <NewChannel />   
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