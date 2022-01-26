import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp({}) {
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
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="username">Username: {' '}</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="password">Password: {' '}</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="password_confirmation">Confirm Password: {' '}</label>
                <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
            </p>
            <button type="submit">Submit</button>
        </form>
        {errors.map((err) => (<div key={err.id} className="login-errors">{err}</div>))}
    </div>
    );
  } 

export default SignUp