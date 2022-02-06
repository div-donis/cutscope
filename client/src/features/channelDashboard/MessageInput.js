import React, { useEffect, useState } from 'react'
import { addMessage } from './channelDashboardSlice'
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineSend } from 'react-icons/ai'
import { createConsumer } from '@rails/actioncable'
import { useParams } from 'react-router'

const MessageInput = () => {

    const params = useParams()

    const initialValues =  {
        content: '',
    }

    const [values, setValues] = useState(initialValues)

    const dispatch = useDispatch();

    const currentChannel = useSelector((state) => state.channelDashboard.currentChannel);

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
            user_avatar: user.avatar
        })
    }
    
    useEffect(() => {

       const cable = createConsumer('ws://localhost/3000/cable')

       const paramsGo = {
           channel: 'ChannelsChannel',
           id: params.id
       }

       const handlers = {
           received(data){
               dispatch(addMessage(data))
           },
           connected(){
               console.log('connected')
           },
           disconnected(){
               console.log('disconnected')
           }
       }

       const subscription = cable.subscriptions.create(paramsGo, handlers)

       return function cleanup() {
           console.log('unsubscribing...' , params.id)
           cable.current = null
           subscription.unsubscribe()
       }


    }, [params.id])

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