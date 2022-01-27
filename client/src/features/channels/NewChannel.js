import React, { useState } from 'react'
import { channelAdded } from './channelsSlice'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from "uuid";



const initialValues =  {
    name: '',
    subject: '',
}

const NewChannel = () => {

    const [values, setValues] = useState(initialValues)

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value,
            image: 'https://i.imgur.com/tqwpka0.png'
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/channels', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if (res.ok) { 
                dispatch(channelAdded(values))
                setValues(initialValues)
                }
            })
            .catch(console.error);    
    }     


    return(
        <div className='new-channel'>
            <form onSubmit={handleSubmit}>
                <button type='submit'> + </button>
                <div className='new-channel-inputs'>
                    <input 
                        type='text'
                        onChange={handleInputChange}
                        name='name'
                        value={values.name}
                        placeholder='channel name'
                    />
                    <input 
                        type='text'
                        onChange={handleInputChange}
                        name='subject'
                        value={values.subject}
                        placeholder='channel subject'
                    />
                </div>  
            </form>
        </div>
    )
}
export default NewChannel