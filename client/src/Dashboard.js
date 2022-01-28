import React, { useState } from 'react'
import User from './features/user/User'
import Channels from './features/channels/Channels'
import ChannelDashboard from './features/channelDashboard/ChannelDashboard'
import './Dashboard.css'
import UserMenu from './features/user/UserMenu'

const Dashboard = ( { onLogOut, user }) => {

    const [menuActive, setMenuActive] = useState(false)

    const toggleMenu = () => {
         setMenuActive((menuActive) => !menuActive)
     }

    return(
        <div className='dashboard'>
            <div className='left-container'> 
                <User 
                    onLogOut={onLogOut} 
                    user={user} 
                    menuActive={menuActive}
                    toggleMenu={toggleMenu}
                />
                <UserMenu 
                    menuActive={menuActive}
                />
                <Channels />
            </div>
            <div className='right-container'> 
                <ChannelDashboard />
            </div>
        </div>
    )
}
export default Dashboard