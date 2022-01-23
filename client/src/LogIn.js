import React, { useState } from "react";

function LogIn({ onLogIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])

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
                onLogIn(user)
                setUsername("")
                setPassword("")
            })
            } else{
                r.json().then((err)=>setErrors(err.errors))
            }
        })
    }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} autoComplete="new-password" >
        <p>
          <label for="username">Username: {' '}</label>
            <input
              autoComplete="off" 
              name='username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
        </p>
        <p>
          <label for="password">Password: {' '}</label>
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
      {errors.map((err) => (<div key={err.id} className="login-errors">{err}</div>))}
    </div>
  );
}

export default LogIn;