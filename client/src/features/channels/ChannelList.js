import React from 'react'

const ChannelList= ( {filteredChannels} ) => {
    return(
        <ul className='channel-list'>
            {filteredChannels.map((channel) => (
            <>
                <li key={channel.id}>{channel.name}</li>
                <li key={channel.id} className='channel-subject'>{channel.subject}</li>
            </>
            ))}
        </ul>
    )
}
export default ChannelList