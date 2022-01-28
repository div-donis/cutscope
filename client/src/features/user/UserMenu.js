import React from 'react'
import { useDispatch } from "react-redux";
import { setUser, setStatus } from './userSlice'
import { useNavigate } from "react-router-dom";
import { FiSettings, FiLogOut } from 'react-icons/fi'

const UserMenu = ( {menuActive} ) => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            dispatch(setUser(null))
            dispatch(setStatus('failed'))
            navigate('/')   
          }
        })
    }
    
    return(
        <div className={ menuActive ? 'user-drop-active' : 'user-drop'}>
            <ul className='user-menu'>
                <li key='settings'><FiSettings id='account-settings'/> Settings</li>
                <li key='logout' onClick={handleLogout}><FiLogOut id='logout' />Logout</li>
            </ul>
        </div>
    )
}

export default UserMenu