import React, { useState } from 'react'
import { channelAdded } from './channelsSlice'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from "uuid";

const initialValues =  {
    id: uuid(),
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
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(channelAdded(values))
        setValues(initialValues)
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