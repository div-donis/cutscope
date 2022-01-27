import React, { useState } from 'react'
import { addMessage } from '../channelDashboard/channelDashboardSlice'
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineSend } from 'react-icons/ai'

const MessageInput = () => {

    const initialValues =  {
        content: '',
    }

    const [values, setValues] = useState(initialValues)

    const dispatch = useDispatch();

    const currentChannel = useSelector((state) => state.channelDashboard.currentEntity);

    const user = useSelector((state) => state.user.entity);

    const handleInputChange = (e) => {
        const { name, value } = e.target

        const timestamp = new Date()

        setValues({
            ...values,
            [name]: value,
            id: uuidv4(),
            channel_id: currentChannel.id,
            user_id: user.id,
            votes: 0,
            created_at: timestamp.toISOString(),
            user_username: user.username,
            user_avatar: user.  avatar
        })
    }

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
                dispatch(addMessage(values))
                setValues(initialValues)
                }
            })
            .catch(console.error);    
    }
    

    return(
        <div className='message-input'>
            <form className='message-form' onSubmit={handleSubmit}>
                <div>
                    <textarea 
                    className='message-input-text'
                    onChange={handleInputChange}
                    name='content'
                    value={values.content}
                    placeholder='say something...'
                />
                </div>
                <button type='submit'><AiOutlineSend id='send'/></button>
            </form>
        </div>
    )
}
export default MessageInput