import React, { useEffect, useState } from 'react'
import { addMessage } from './channelDashboardSlice'
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSend } from 'react-icons/ai'
import { cableApp } from '../..';

const MessageInput = () => {

    const initialValues =  {
        content: '',
    }

    const [values, setValues] = useState(initialValues)

    const dispatch = useDispatch();

    const currentChannel = useSelector((state) => state.channelDashboard.currentChannel);

    const user = useSelector((state) => state.user.entity);

    console.log(cableApp)

    const handleInputChange = (e) => {

        const { name, value } = e.target

        const timestamp = new Date()

        setValues({
            ...values,
            [name]: value,
            channel_id: currentChannel.id,
            user_id: user.id,
            votes: 0,
            created_at: timestamp.toISOString(),
            user_username: user.username,
            user_avatar: user.avatar
        })
    }

    console.log(currentChannel)

    useEffect(() => {
        if (currentChannel){
            cableApp.room = cableApp.cable.subscriptions.create({
                channel: 'ChannelChannel',
                room: 228    
            },
            {
                received: (data) => {
                    console.log(data)
                    const message = {
                        id: data.message.id,
                        content: data.message.content,
                        channel_id: data.message.channel_id,
                        user_id: data.message.user_id,
                        votes: data.message.votes,
                        created_at: data.message.created_at,
                        user_username: data.user.username,
                        user_avatar: data.user.avatar
                    }
                    if (message.content !== '000connectfixlink000'){
                        dispatch(addMessage(message))
                    }
                },
                connected: () => {
                    console.log('connected')
                },
                disconnected: () => {
                    console.log('disconnected')
            },
            })
        }
    }, [currentChannel.id])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/messages', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if (res.ok) { 
                setValues(initialValues)
                }
            })
            .catch(console.error);    
    }
    
    return(
        <div className='message-input'>
            <form className='message-form' autoFocus onSubmit={handleSubmit}>
                <div>
                    <textarea 
                    className='message-input-text'
                    onChange={handleInputChange}
                    name='content'
                    value={values.content}
                    placeholder='Say Something...'
                />
                </div>
                <button type='submit'><AiOutlineSend id='send'/></button>
            </form>
        </div>
    )
}
export default MessageInput