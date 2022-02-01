import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "./channelDashboardSlice";
import ChannelSearch from './ChannelSearch';
import ChannelList from './ChannelList';
import NewChannel from './NewChannel';


const Channels = () => {
    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channelDashboard.channels);

    const status = useSelector((state) => state.channelDashboard.channelsStatus);

    console.log(status)

    useEffect(() => {
        dispatch(fetchChannels())
    }, [dispatch])

    const [searchChannelsBy, setSearchChannelsBy] = useState("");
      
    function handleSearchChange(event) {
        setSearchChannelsBy(event.target.value);
    }

    const filteredChannels = !searchChannelsBy
    ? channels 
    : channels.filter((channel) => channel.name.includes(searchChannelsBy))

    return(
        <div className='channels'>
           <ChannelSearch 
                handleSearchChange={handleSearchChange}
                searchChannelsBy={searchChannelsBy}
            />
            <ul className='channel-list'>
                
            {filteredChannels ? filteredChannels.map((channel) => (
                <ChannelList 
                    key={channel.name}
                    channel={channel}  
                />
            )) : <li>loading...</li>}
            </ul>
            <NewChannel />
        </div>
    )
}
export default Channels