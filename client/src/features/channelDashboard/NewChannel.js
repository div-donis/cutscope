import React from 'react'
import { VscAdd, VscChromeClose } from 'react-icons/vsc'

const NewChannel = ({
    errors,
    handleInputChange,
    handleSubmit,
    setErrors,
    values
}) => {

    return(
        <>
            <div className={errors ? 'new-channel-errors' : 'new-channel-errors-closed'}>
                <div id='close-errors' onClick={() => setErrors(null)}>
                    <VscChromeClose />
                </div>
                {errors?.map((err, i) => (
                    <div 
                        className={
                            err === 'Channel created!' ? 
                            'success-bubble' : 
                            'error-bubble'
                        } key={i}
                    >
                        {err}
                    </div>
                ))}
            </div>
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