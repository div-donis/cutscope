import React, { useEffect, useRef } from 'react'
import { fetchCurrentChannelMessages } from "./channelDashboardSlice";
import { useDispatch, useSelector } from "react-redux";

const MessageBoard = () => {

    const dispatch = useDispatch();

    const currentChannel = useSelector((state) => state.channelDashboard.currentEntity);

    const messages = useSelector((state) => state.channelDashboard.currentChannelMessages);

    const user = useSelector((state) => state.user.entity);

    useEffect(() => {
        if(currentChannel){
            dispatch(fetchCurrentChannelMessages(currentChannel.id))
        }
    }, [currentChannel])

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />
    };

    return(
        <div className='message-board'>
            <div className='message-container'>
                {messages ? 
                    messages.map((message) => 
                    <div key={message.id} className={user.id === message.user_id ? 'message-board-message-right' : 'message-board-message-left'}>
                        <div>
                            <p className='message-board-message-content'>{message.content}</p>  
                            <p className='message-board-message-time'>{message.created_at}</p>  
                        </div> 
                    </div>
                    )
                : null}
            </div> 
            <AlwaysScrollToBottom />
        </div>
    )
}
export default MessageBoard