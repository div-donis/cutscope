import React from 'react'
import { userChannelAdded, setCurrentChannel, addMessage } from '../channelDashboard/channelDashboardSlice'
import { useDispatch, useSelector } from "react-redux";
import { GoPrimitiveDot } from 'react-icons/go'
import { v4 as uuidv4 } from 'uuid';

const ChannelList= ( { channel } ) => {

    const user = useSelector((state) => state.user.entity);

    const timestamp = new Date()

    const values = {
        content: `*${user.username} has joined the channel*`,
        id: uuidv4(),
        channel_id: channel.id,
        user_id: user.id,
        votes: 0,
        created_at: timestamp.toISOString(),
        user_username: user.username,
        user_avatar: user.avatar
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
                dispatch(addMessage(values))
            }else{
                dispatch(setCurrentChannel(channel))
            }
        })
        .catch(console.error); 
    }

    return( 
            <>
                <GoPrimitiveDot id='channel-dot'/>
                <li key={channel.id} onClick={handleAddChannel}>{channel.name}</li>
                <li key={`${channel.id}b`} className='channel-subject'>{channel.subject}</li>
            </>   
    )
}
export default ChannelList