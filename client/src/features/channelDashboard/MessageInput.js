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
            user_profile_image_url: user.profile_image_url
        })
    }
    
    useEffect(() => {
        setValues(initialValues)
    }, [currentChannel])

    console.log(currentChannel)

    useEffect(() => {
        if (currentChannel){
            cableApp.room = cableApp.cable.subscriptions.create({
                channel: 'ChannelChannel',
                room: currentChannel.id  
            },
            {
                received: (data) => {
                    console.log(data)
                    if (data.message.content !== 'F4FvR%DfmyOEbaP=K3aZ'){
                        dispatch(addMessage(data))
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
    }, [currentChannel])

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