import React from 'react'
import { userChannelAdded } from '../channelDashboard/channelDashboardSlice'
import { setCurrentChannel } from '../channelDashboard/channelDashboardSlice'
import { useDispatch } from "react-redux";
import { GoPrimitiveDot } from 'react-icons/go'

const ChannelList= ( { channel } ) => {

    const dispatch = useDispatch()

    const handleAddChannel = (channel) => {
        dispatch(userChannelAdded(channel))
        dispatch(setCurrentChannel(channel))
    }

    return( 
            <>
                <GoPrimitiveDot id='channel-dot'/>
                <li key={channel.id} onClick={() => handleAddChannel(channel)}>{channel.name}</li>
                <li key={`${channel.id}b`} className='channel-subject'>{channel.subject}</li>
            </>   
    )
}
export default ChannelList