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
            <div className="auth-forward"> Need an account? <div style={{display: 'inline'}} onClick={() => navigate('/signup')}>Sign Up</div></div>
            <form onSubmit={handleSubmit} className='auth-form' autoComplete="new-password" >
                <div className="logo"><img alt='logo' src='https://i.imgur.com/fASKYWx.png'></img><div id='rotoswim' style={{display: 'inline'}}>rotoswim</div></div>
                <div className="auth-inputs">
                    <p>
                    <label htmlFor="username"></label>
                    <input
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
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                </div>
                <button type="submit">Login</button>
                <div className="login-error-bubble">{errors?.map((err) => (<div key={err.id} className="error-message">{err}</div>))}</div>
            </form> 
            </div>
        );
    }
}

export default LogIn;