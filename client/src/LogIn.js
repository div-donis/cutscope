import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from './features/user/userSlice'

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
    if (!status) {
        return(
            <>loading</>
        )
    } else {
        return (
            <div className='login'>
            <form onSubmit={handleSubmit} autoComplete="new-password" >
                <p>
                <label htmlFor="username">Username: {' '}</label>
                    <input
                    autoComplete="off" 
                    name='username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </p>
                <p>
                <label htmlFor="password">Password: {' '}</label>
                    <input
                    autoComplete="off"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <button type="submit">Login</button>
            </form>
            {errors?.map((err) => (<div key={err.id} className="login-errors">{err}</div>))}
            </div>
        );
    }
}

export default LogIn;