import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'

function Cable( {cableApp} ) {

    const channel = useSelector((state) => state.channelDashboard.currentChannel)

    useEffect(()=>{
            cableApp.room = cableApp.cable.subscriptions.create({
            channel: 'ChannelsChannel',
            room: channel.id
            
        },
        {
            received: () => {
              
        }
        })
    },[channel.id])

    return (
        <div>
            
        </div>
    )
}

export default Cable