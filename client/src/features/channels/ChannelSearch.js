import React from "react";



const ChannelSearch = ( {handleSearchChange, searchChannelsBy} ) => {

    return(
        <div className='channel-search'>
            <input
                type="search"
                onChange={(e) => handleSearchChange(e)}
                name="searchChannelsBy"
                value={searchChannelsBy}
                placeholder="search channels"
            />
        </div>
    )
}
export default ChannelSearch