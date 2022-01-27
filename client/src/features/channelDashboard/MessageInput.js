import React from 'react'

import { useDispatch, useSelector } from "react-redux";

const MessageInput = () => {

    const dispatch = useDispatch();

    const currentChannel = useSelector((state) => state.channelDashboard.currentEntity);

    const user = useSelector((state) => state.user.entity);

    return(
        <div className='message-input'>
            <form className='message-form'>
                <div>
                    <textarea className='message-input-text'></textarea>
                </div>
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}
export default MessageInput