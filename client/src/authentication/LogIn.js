import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../features/user/userSlice'
import './Authentication.css'

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])

  const status = useSelector((state) => state.user.status)

  const dispatch = useDispatch();

  const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                username: username, 
                password : password
            }),
        })
        .then((r)=>{
            if(r.ok){
                r.json()
                .then((user)=>{
                dispatch(setUser(user))
                setUsername("")
                setPassword("")
                navigate('/')  
            })
            } else{
                r.json().then((err)=>setErrors(err.errors))
            }
        })
    }
    if (status === 'loading') {
        return(
            <>loading</>
        )
    } else {
        return (
            <div className='login'>
            <form onSubmit={handleSubmit} className='auth-form' autoComplete="new-password" >
                <div className="logo"><img alt='logo' src='https://i.imgur.com/oWqc2lw.png'></img></div>
                <p>
                    <label htmlFor="username"></label>
                    <input
                    autoComplete="off" 
                    name='username'
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="password"></label>
                    <input
                    autoComplete="off"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <button type="submit">Login</button>
            </form>
            <div className="login-errors">{errors?.map((err) => (<div key={err.id} className="login-errors">{err}</div>))}</div>
            </div>
        );
    }
}

export default LogIn;