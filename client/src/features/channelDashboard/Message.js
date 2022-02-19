import React, { useState } from 'react'
import { AiTwotoneStar } from 'react-icons/ai'

const Message = ({message, numFormatter}) => {

    const [votes, setVotes] = useState(message.votes)

    const moment = require("moment");

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
                setVotes(votes + 1)
            }
        })   
    } 

    return(
        <div key={message.id} className='message-board-message'> 
            <div className='message-board-message'>
                <div className='message-user-details'>
                    <img alt='user' className='message-board-message-img' src={message.user_profile_image_url ? `${message.user_profile_image_url}` : 'https://i.imgur.com/qbBOch9.png'} /> 
                    <p className='message-board-message-user'>
                        {message.user_username}
                    </p>
                </div>
                <div>
                    <p className='message-board-message-content'>
                        {message.content}
                    </p>  
                    <p className='message-board-message-votes' onClick={() => handleUpVote(message.id, votes)}>
                        <AiTwotoneStar id='star'/> {numFormatter(votes)}
                    </p>
                    <div className='message-board-message-time'>
                        <hr/>{moment(message.created_at).format('MMM DD YYYY h:mma')}<hr/>
                    </div>  
                </div>
            </div> 
        </div>
    )
}

export default Message