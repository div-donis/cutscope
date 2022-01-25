import React, {useState} from 'react'
import './User.css'

const User = ( { onLogOut, user } ) => {

    const [menuActive, setMenuActive] = useState(false)

    const toggleMenu = () => {
        setMenuActive((menuActive) => !menuActive)
    }

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            onLogOut(null);
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
                    ^
                </div>
            </div>
            <div className={ menuActive ? 'user-drop-active' : 'user-drop'}>
                <ul className='user-menu'>
                    <li key='settings'>Account Settings</li>
                    <li key='logout' onClick={handleLogout}>Logout</li>
                </ul>
            </div>
        </div>
    )
}
export default User