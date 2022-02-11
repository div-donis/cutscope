import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel, setUserChannels } from './channelDashboardSlice'
import { GoPrimitiveDot } from 'react-icons/go'

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
            <div id='spacedes'></div>
            <div className='user-channels-header'>User Channels</div>
            <div className='user-channel-cont'>
                {userChannels.length < 1 ? <div id='no-channels'> Your channels will appear here. </div> : userChannels.map((userChannel) => 
                    <div key={userChannel.id} onClick={() => handleSetChannel(userChannel)} className='channel-rack-channel-details'>
                        <GoPrimitiveDot id='user-channel-dot'/>
                        <div className='user-channel-name'>{userChannel.name}</div>
                        <div className='user-channel-subject'>{userChannel.subject}</div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ChannelRack