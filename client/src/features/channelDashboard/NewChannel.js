import React, { useState } from 'react'
import { channelAdded } from './channelDashboardSlice'
import { useDispatch } from 'react-redux'
import { VscAdd, VscChromeClose } from 'react-icons/vsc'

const initialValues =  {
    name: '',
    subject: '',
}

const NewChannel = () => {

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState(null)

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
        fetch('/api/channels', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((r) => {
            if (r.ok) { 
                setErrors(['Channel created!'])
            }else{
                r.json().then((err)=>
                    setErrors(err.errors)
                )
            }
        })  
    }     

    console.log(errors)

    return(
        <>
            <div className={errors ? 'new-channel-errors' : 'new-channel-errors-closed'}><div id='close-errors' onClick={() => setErrors(null)}><VscChromeClose /></div>{errors?.map((err, i) => (<div className={err === 'Channel created!' ? 'success-bubble' : 'error-bubble'} key={i}>{err}</div>))}</div>
            <div className='new-channel'>
                
                <form onSubmit={handleSubmit}  autoComplete="off">
                    <button type='submit'><VscAdd id='add-channel'/></button>
                    <div className='new-channel-inputs'>
                        <input 
                            type='text'
                            onChange={handleInputChange}
                            name='name'
                            value={values.name.toLowerCase()}
                            placeholder='Channel Name'
                        />
                        <input 
                            type='text'
                            onChange={handleInputChange}
                            name='subject'
                            value={values.subject}
                            placeholder='Channel Subject'
                        />
                    </div>  
                </form>
            </div>
        </>
    )
}
export default NewChannel