import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Authentication.css'

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()
  
    function handleSubmit(e) {
      e.preventDefault();
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          avatar: 'https://i.imgur.com/qbBOch9.png',
          password: password,
          password_confirmation: passwordConfirmation,
        }),
      })
        .then((r)=>{
            if(r.ok){
                console.log(r)
                r.json()
                .then((user)=>{
                console.log(user)
                navigate('/')
            })
            } else{
                r.json().then((err)=>{
                    console.log(r)
                    console.log(err.errors)
                    setErrors(err.errors)
                })
            }
        })
    }
  
    return (
    <div className='signup'>
            <div className="auth-forward"> Already have an account? <div style={{display: 'inline'}} onClick={() => navigate('/')}>Log In</div></div>
        <form className='auth-form' onSubmit={handleSubmit} autoComplete="new-password">
          <div className="logo"><img alt='logo' src='https://i.imgur.com/fASKYWx.png'></img><div id='rotoswim' style={{display: 'inline'}}>rotoswim</div></div>
          <div className="auth-inputs">
          <p>
              <label htmlFor="username"></label>
              <input
              type="text"
              id="username"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              />
          </p>
          <p>
              <label htmlFor="password"></label>
              <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              />
          </p>
          <p>
              <label htmlFor="password_confirmation"></label>
              <input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              placeholder="Confirm Password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
          </p>
          </div>
          <button type="submit">Sign Up</button>
          { errors.length > 0 ? <div className="login-error-bubble">{errors.map((err) => (<div key={err.id} className="error-message">{err}</div>))}</div>: null}
        </form>
    </div>
    );
  } 

export default SignUp