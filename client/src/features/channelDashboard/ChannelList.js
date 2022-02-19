import React from 'react'
import { userChannelAdded, setCurrentChannel } from './channelDashboardSlice'
import { useDispatch, useSelector } from "react-redux"
import Channel from './Channel'

const ChannelList= ( {channel} ) => {

    const user = useSelector((state) => state.user.entity);

    const values = {
        content: 'F4FvR%DfmyOEbaP=K3aZ',
        channel_id: channel.id,
        user_id: user.id
    }

    const dispatch = useDispatch()

    const handleAddChannel = () => {
        fetch('/api/messages', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if (res.ok) { 
                dispatch(userChannelAdded(channel))
                dispatch(setCurrentChannel(channel))
            }else{
                dispatch(setCurrentChannel(channel))
            }
        })
        .catch(console.error); 
    }

    return( 
        <Channel
            channel={channel} 
            handleAddChannel={handleAddChannel}
        />   
    )
}
export default ChannelList