import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMinus } from 'react-icons/ai'
import { toggleMenu } from './userSlice'
import './User.css'

const User = () => {

    const user = useSelector((state) => state.user.entity);

    const menuActive = useSelector((state) => state.user.menuActive)

    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleMenu(!menuActive))
    }

    return(
        <div className='user' onClick={handleToggle}>
            <div className='user-details'>
                <img alt='user avi' src={`${user.avatar}`}></img>
                <div className='user-username'>
                    {user.username}
                </div>
                <div className={ menuActive ? 'user-menu-arrow-up' : 'user-menu-arrow-down'}>
                    <AiOutlineMinus id='minus-1' /><AiOutlineMinus id={menuActive ? 'minus-2' : 'minus-2-open'} />
                </div>
            </div>
        </div>
    )
}
export default User