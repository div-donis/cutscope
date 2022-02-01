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
        <form className='auth-form' onSubmit={handleSubmit}>
          <div className="logo"><img src='https://i.imgur.com/oWqc2lw.png'></img></div>
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
          <button type="submit">Sign Up</button>
          <div className="login-errors">{errors.map((err) => (<div key={err.id} className="error-message">{err}</div>))}</div>
        </form>
    </div>
    );
  } 

export default SignUp