import React from "react";
import { AiOutlineSearch } from 'react-icons/ai'



const ChannelSearch = ( {handleSearchChange} ) => {

    return(
        <div className='channel-search'>
            <input
                type="search"
                onChange={(e) => handleSearchChange(e)}
                name="searchChannelsBy"
                placeholder="Search Channels"
            />
            < AiOutlineSearch id='search-glass' />
        </div>
    )
}
export default ChannelSearch