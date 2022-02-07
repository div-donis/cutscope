import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel, setUserChannels } from './channelDashboardSlice'

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

    const currentChannel = useSelector((state) => state.channelDashboard.currentChannel);

useEffect(() => {
    if(userChannels.length > 0 && !currentChannel){
        dispatch(setCurrentChannel(userChannels[0]))
    }
},[currentChannel, userChannels])

    return(
        <div className='channel-rack'>
            {userChannels.length < 1 ? <div id='no-channels'> Your channels will appear here. </div> : userChannels.map((userChannel) => 
                <div key={userChannel.id} className='channel-rack-channel-details'>
                    <img alt='channel' src='https://i.imgur.com/iLI8EYT.png' className='user-channel-emblem' onClick={() => handleSetChannel(userChannel)}></img>
                    <div className='user-channel-name'>{userChannel.name}</div>
                </div>
            )}
        </div>
    )
}
export default ChannelRack