import React from 'react'
import { userChannelAdded } from '../channelDashboard/channelDashboardSlice'
import { useDispatch } from "react-redux";

const ChannelList= ( { channel } ) => {

    const dispatch = useDispatch()

    const handleAddChannel = (channel) => {
        dispatch(userChannelAdded(channel))
    }

    return( 
            <>
                <li key={channel.id} onClick={() => handleAddChannel(channel)}>{channel.name}</li>
                <li key={`${channel.id}b`} className='channel-subject'>{channel.subject}</li>
            </>   
    )
}
export default ChannelList