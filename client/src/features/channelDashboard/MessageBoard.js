import React, { useEffect, useRef } from 'react'
import { fetchCurrentChannelMessages, upVote } from "./channelDashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneStar } from 'react-icons/ai'

const MessageBoard = () => {

    const moment = require("moment");

    const dispatch = useDispatch();

    const currentChannel = useSelector((state) => state.channelDashboard.currentChannel);

    const messages = useSelector((state) => state.channelDashboard.currentChannelMessages);

    const user = useSelector((state) => state.user.entity);

    useEffect(() => {
        if(currentChannel){
            dispatch(fetchCurrentChannelMessages(currentChannel.id))
        }
    }, [currentChannel, dispatch])

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />
    };

    const handleUpVote = (id, votes) => {
        fetch(`/api/messages/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                votes: votes + 1,
            })
        }).then((r) => {
            if (r.ok) { 
                dispatch(upVote(id))
            }
        })   
    } 

    const numFormatter = (num) => {
        if(num > 999 && num < 1000000){
            return (num/1000).toFixed(1) + 'K'; 
        }else if(num > 1000000){
            return (num/1000000).toFixed(1) + 'M'; 
        }else if(num < 900){
            return num; 
        }
    }

    return(
        <div className='message-board'>
            <div className='message-container'>
                {messages && currentChannel?.id === messages[0]?.channel_id? 
                    messages.map((message) => 
                    <div key={message.id} className={user.id === message.user_id ? 'message-board-message-right' : 'message-board-message-left'}>
             
                        <div className='message-board-message'>
                        <div className='message-user-details'>
                            <img alt='user iamge' className='message-board-message-img' src={message.user_avatar} /> 
                            <p className='message-board-message-user'>{message.user_username}</p>
                        </div >
                        <div >
                            
                            <p className='message-board-message-content'>{message.content}</p>  
                            <p className='message-board-message-votes' onClick={() => handleUpVote(message.id, message.votes)}><AiTwotoneStar id='star'/>{numFormatter(message.votes)}</p>
                            <div className='message-board-message-time'><hr />{moment(message.created_at).format('MMM DD YYYY h:mma')}<hr /></div>  
                        </div>
                        </div> 
                    </div>
                    )
                : 'loading...'}
            </div> 
            <AlwaysScrollToBottom />
        </div>
    )
}
export default MessageBoard