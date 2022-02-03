import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "./channelDashboardSlice";
import ChannelSearch from './ChannelSearch';
import ChannelList from './ChannelList';
import NewChannel from './NewChannel';


const Channels = () => {
    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channelDashboard.channels);

    const status = useSelector((state) => state.channelDashboard.channelsStatus);
      
    function handleSearchChange(event) {
        dispatch(fetchChannels((event.target.value).toLowerCase()))
    }

    console.log(status)

    return(
        <div className='channels'>
           <ChannelSearch 
                handleSearchChange={handleSearchChange}
            />
            <ul className='channel-list'>   
                {channels.length > 0 ? channels?.map((channel) => (
                    <ChannelList 
                        key={channel.name}
                        channel={channel}  
                    />
                )) : null }
            </ul>
            <NewChannel />
        </div>
    )
}
export default Channels