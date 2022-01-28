import React from 'react'
import { useSelector } from "react-redux";
import { AiOutlineMinus } from 'react-icons/ai'
import './User.css'

const User = ( {menuActive, toggleMenu} ) => {

    const user = useSelector((state) => state.user.entity);



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
        </div>
    )
}
export default User