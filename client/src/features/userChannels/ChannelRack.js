import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserChannels } from "./userChannelsSlice";
import './UserChannels.css'

const ChannelRack = () => {
    const dispatch = useDispatch();

    const userChannels = useSelector((state) => state.userChannels.entities);

    useEffect(() => {
        dispatch(fetchUserChannels())
    }, [dispatch])

    return(
        <div className='channel-rack'>
            {userChannels.map((userChannel) => 
                <div className='channel-rack-channel-details'>
                    <img key={userChannel.id} src={userChannel.image}></img>
                    <div>{userChannel.name}</div>
                </div>
            )}
        </div>
    )
}
export default ChannelRack