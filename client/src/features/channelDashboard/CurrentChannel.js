import React from 'react'
import { useSelector } from "react-redux";

const CurrentChannel = () => {

    const currentChannel = useSelector((state) => state.channelDashboard.currentChannel)

    return(
        <div className='current-channel'>
            {currentChannel ? 
            <div className='current-channel-details'>
                <div>{currentChannel?.name}</div>
            </div>
            : null}
        </div>
    )
}
export default CurrentChannel