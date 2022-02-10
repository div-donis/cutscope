import User from './features/user/User'
import Channels from './features/channelDashboard/Channels'
import ChannelDashboard from './features/channelDashboard/ChannelDashboard'
import './Dashboard.css'
import UserMenu from './features/user/UserMenu'
import ChannelRack from './features/channelDashboard/ChannelRack'

const Dashboard = ( { onLogOut, user }) => {

 
    return(
        <div className='dashboard'>
            <div className='left-container'> 
                <User 
                    user={user} 
                />
                <UserMenu 
                />
                <Channels />
            </div>
            <div className='middle-container'> 
                <ChannelDashboard />
            </div>
            <div className='right-container'> 
                <ChannelRack />
            </div>
        </div>
    )
}
export default Dashboard