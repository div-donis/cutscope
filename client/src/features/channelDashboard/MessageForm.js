import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'

const MessageForm = ({
    handleInputChange,
    values,
    handleSubmit
}) => {
    return(
        <form 
            className='message-form' 
            autoFocus 
            onSubmit={handleSubmit}
        >
            <div>
                <textarea 
                className='message-input-text'
                onChange={handleInputChange}
                name='content'
                value={values.content}
                placeholder='Say Something...'
            />
            </div>
            <button type='submit'>
                <AiOutlineSend id='send'/>
            </button>
        </form>
    )
}

export default MessageForm