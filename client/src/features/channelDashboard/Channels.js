import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "./channelDashboardSlice";
import ChannelSearch from './ChannelSearch';
import ChannelList from './ChannelList';
import NewChannel from './NewChannel';


const Channels = () => {
    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channelDashboard.channels);
      
    function handleSearchChange(event) {
        dispatch(fetchChannels((event.target.value).toLowerCase()))
    }
    const initialValues =  {
        name: '',
        subject: '',
    }
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState(null)
    

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

    return(
        <div className='channels'>
           <ChannelSearch 
                handleSearchChange={handleSearchChange}
            />
            <ul className='channel-list'>   
                {channels.length > 0 ? channels?.map((channel) => (
                    <ChannelList 
                        key={channel.name}
                        channel={channel}  
                    />
                )) : <li key='lgfad' id='lgfad'>Let's go for a dip! <div style={{display: 'inline'}}>&#127754;</div></li>}
            </ul>
            <NewChannel 
                errors={errors}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                setErrors={setErrors}
                values={values}
            />
        </div>
    )
}
export default Channels