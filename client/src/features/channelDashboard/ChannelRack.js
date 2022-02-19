import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel, setUserChannels } from './channelDashboardSlice'
import ChannelUsers from './ChannelUser';
import UserChannels from './UserChannels';


const ChannelRack = () => {
    const dispatch = useDispatch();

    const channelsFromUser = useSelector((state) => state.user.entity.channels);

    useEffect(() => {
        dispatch(setUserChannels(channelsFromUser))
    }, [])

    const handleSetChannel = (userChannel) => {
        dispatch(setCurrentChannel(userChannel))
    }

    const userChannels = useSelector((state) => state.channelDashboard.userChannels);

    const channelUsers = useSelector((state) => state.channelDashboard.channelUsers);

    const currentChannel = useSelector((state) => state.channelDashboard.currentChannel);

    const user =  useSelector((state) => state.user.entity)

useEffect(() => {
    if(userChannels.length > 0 && !currentChannel){
        dispatch(setCurrentChannel(userChannels[0]))
    }
},[currentChannel, userChannels])
console.log(channelUsers)

    const headerStyle = {
        color: 'var(--font6)', 
        fontWeight: '600',
        fontSize: '18.7px',
        fontStyle: 'italic'
    }

    return(
        <div className='channel-rack'>
            <div id='spacedes'></div>
            <div className='user-channels-header'>
                <div style={headerStyle}>{user.username}'s</div>
            </div>
            <div className='user-channel-cont'>
                {userChannels.length < 1 ? <div id='no-channels'> Your channels will appear here. </div> : userChannels.map((userChannel) => 
                    <UserChannels 
                        userChannel={userChannel}
                        handleSetChannel={handleSetChannel}
                    />
                )}
            </div>
            <div className='channel-users-header'>
                <div style={headerStyle}>{currentChannel.name}</div>
            </div>
            <div className='channel-user-cont'>
                {channelUsers ?  channelUsers.map((user) => 
                    <ChannelUsers
                        user={user} 
                    />
                ): null}
            </div>
        </div>
    )
}
export default ChannelRack