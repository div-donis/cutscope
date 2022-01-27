import React, {useState} from 'react'
import { setUser, setStatus } from './userSlice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus } from 'react-icons/ai'
import { FiSettings, FiLogOut } from 'react-icons/fi'
import './User.css'

const User = () => {

    const dispatch = useDispatch();

    const [menuActive, setMenuActive] = useState(false)

    const navigate = useNavigate()

    const toggleMenu = () => {
        setMenuActive((menuActive) => !menuActive)
    }

    const user = useSelector((state) => state.user.entity);

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
        <div className='user'>
            <div className='user-details'>
                <img src={`${user.avatar}`}></img>
                <div className='user-username'>
                    {user.username}
                </div>
                <div className={ menuActive ? 'user-menu-arrow-up' : 'user-menu-arrow-down'} onClick={toggleMenu}>
                    <AiOutlineMinus id='minus-1' /><AiOutlineMinus id={menuActive ? 'minus-2' : 'minus-2-open'} />
                </div>
            </div>
            <div className={ menuActive ? 'user-drop-active' : 'user-drop'}>
                <ul className='user-menu'>
                    <li key='settings'><FiSettings id='account-settings'/> Settings</li>
                    <li key='logout' onClick={handleLogout}><FiLogOut id='logout' />Logout</li>
                </ul>
            </div>
        </div>
    )
}
export default User