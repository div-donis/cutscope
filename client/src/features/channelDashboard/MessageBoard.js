import React, { useEffect, useRef } from 'react'
import { fetchChannelMessages } from "./channelDashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from './Message';

const MessageBoard = () => {

    const dispatch = useDispatch();

    const currentChannel = useSelector((state) => state.channelDashboard.currentChannel);

    const messages = useSelector((state) => state.channelDashboard.channelMessages);

    useEffect(() => {
        if(currentChannel){
            dispatch(fetchChannelMessages(currentChannel.id))
        }
    }, [currentChannel, dispatch])


    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />
    };  

    return(
        <div className='message-board'>
            <div className='message-container'>
                {messages && currentChannel?.id === messages[0]?.channel_id ? 
                    messages.map((message) => 
                    <Message key={message.id} message={message}/>
                    )
                : 'loading...'}
            </div> 
            <AlwaysScrollToBottom />
        </div>
    )
}
export default MessageBoard