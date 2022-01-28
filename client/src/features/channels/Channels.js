import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "./channelsSlice";
import ChannelSearch from './ChannelSearch';
import './Channels.css'
import ChannelList from './ChannelList';
import NewChannel from './NewChannel';


const Channels = () => {
    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channels.entities);

    const status = useSelector((state) => state.channels.status);

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
                
            {filteredChannels && channels ? filteredChannels.map((channel) => (
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