import React, { useState } from 'react'
import { addMessage } from '../channelDashboard/channelDashboardSlice'
import { useDispatch, useSelector } from "react-redux";

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

        setValues({
            ...values,
            [name]: value,
            channel_id: currentChannel.id,
            user_id: user.id,
            votes: 0,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addMessage(values))
        setValues(initialValues)
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
                />
                </div>
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}
export default MessageInput