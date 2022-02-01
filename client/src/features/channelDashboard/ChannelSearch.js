import React from "react";
import { AiOutlineSearch } from 'react-icons/ai'



const ChannelSearch = ( {handleSearchChange, searchChannelsBy} ) => {

    return(
        <div className='channel-search'>
            <input
                type="search"
                onChange={(e) => handleSearchChange(e)}
                name="searchChannelsBy"
                value={searchChannelsBy}
                placeholder="Search Channels"
            />
            < AiOutlineSearch id='search-glass' />
        </div>
    )
}
export default ChannelSearch