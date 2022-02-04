import React from 'react'
import { userChannelAdded, setCurrentChannel } from './channelDashboardSlice'
import { useDispatch, useSelector } from "react-redux";
import { GoPrimitiveDot } from 'react-icons/go'

const ChannelList= ( { channel } ) => {

    const user = useSelector((state) => state.user.entity);

    const values = {
        content: '000connectfixlink000',
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
            <>
                <GoPrimitiveDot id='channel-dot'/>
                <li key={channel.id} onClick={handleAddChannel}>{channel.name}</li>
                <li key={`${channel.id}b`} className='channel-subject'>{channel.subject}</li>
            </>   
    )
}
export default ChannelList