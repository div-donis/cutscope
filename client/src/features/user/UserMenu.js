import React from 'react'
import { setUser } from './userSlice'
import { useNavigate } from "react-router-dom";
import { FiSettings, FiLogOut } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux';

const UserMenu = () => {

    const menuActive = useSelector((state) => state.user.menuActive)

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleLogout = () => {
        fetch("/logout", {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            dispatch(setUser(null))
            navigate('/')   
          }
        })
    }
    
    return(
        <div className={ menuActive ? 'user-drop-active' : 'user-drop'}>
            <ul className='user-menu'>
                <li ><FiSettings id='account-settings'/> Account Settings</li>
                <li onClick={handleLogout}><FiLogOut id='logout' />Logout</li>
            </ul>
        </div>
    )
}

export default UserMenu