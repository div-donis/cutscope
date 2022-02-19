import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go'

const UserChannels = ({
    userChannel,
    handleSetChannel
}) => {
    return(
        <div 
            key={userChannel.id} 
            onClick={() => handleSetChannel(userChannel)} 
            className='channel-rack-channel-details'
        >
            <GoPrimitiveDot id='user-channel-dot'/>
            <div className='user-channel-name'>{userChannel.name}</div>
            <div className='user-channel-subject'>{userChannel.subject}</div>
        </div>
    )
}

export default UserChannels