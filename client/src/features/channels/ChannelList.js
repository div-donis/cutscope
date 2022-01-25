import React from 'react'

const ChannelList= ( { channel } ) => {
    return( 
            <>
                <li key={channel.id}>{channel.name}</li>
                <li key={`${channel.id}b`} className='channel-subject'>{channel.subject}</li>
            </>   
    )
}
export default ChannelList