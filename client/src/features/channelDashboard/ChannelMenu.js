import React, {useState} from 'react'
import { useSelector } from "react-redux";

const ChannelMenu = () => {

    const [menuActive, setMenuActive] = useState(false)

    const currentChannel = useSelector((state) => state.channelDashboard.currentEntity)

    return(
        <div className={menuActive ? 'channel-menu-open' : 'channel-menu-closed'}>
            Leave Channel
        </div>
    )
}
export default ChannelMenu