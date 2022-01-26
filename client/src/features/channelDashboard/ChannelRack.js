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

    const userChannels = useSelector((state) => state.channelDashboard.entities);

useEffect(() => {
    dispatch(setCurrentChannel(userChannels[0]))
},[userChannels])

    return(
        <div className='channel-rack'>
            {userChannels.map((userChannel) => 
                <div key={userChannel.id} className='channel-rack-channel-details'>
                    <img src={userChannel.image} onClick={() => handleSetChannel(userChannel)}></img>
                    <div>{userChannel.name}</div>
                </div>
            )}
        </div>
    )
}
export default ChannelRack