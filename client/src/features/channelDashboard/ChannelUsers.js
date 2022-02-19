import React from 'react'

const ChannelUsers = ({
    user
}) => {
    return(
        <div key={`${user.username}${user.id}`} className='user-cont'>
            <img  alt='user' src={user.profile_image_url ? `${user.profile_image_url}` : 'https://i.imgur.com/qbBOch9.png'}></img>
            <div className='channel-user-name'>{user.username}</div>
        </div>
    )
}

export default ChannelUsers