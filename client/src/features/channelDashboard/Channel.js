import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go'

const Channel = ({
    channel,
    handleAddChannel
}) => {
    return(
        <>
            <GoPrimitiveDot id='channel-dot'/>
            <li key={channel.id} onClick={handleAddChannel}>{channel.name}</li>
            <li key={`${channel.id}b`} className='channel-subject'>{channel.subject}</li>
        </> 
    )
}

export default Channel