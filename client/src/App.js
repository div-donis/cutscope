import './App.css';
import LogIn from './LogIn';  
import SignUp from './SignUp';  
import Dashboard from './Dashboard';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'



const App = () => {

  const [user, setUser] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    fetch("/self").then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          setUser(user)
          navigate('/')
        })
      }else{
        navigate('/login')
      }
    });
  }, []); 

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    })
  }

  if (user) {
    return(
      <div className="App">
          <Routes>
            <Route path='/' element={<Dashboard />}/>
          </Routes>
          <p onClick={handleLogout}>logout</p>
      </div>
    )
  } else {
    return(
      <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />}/>
            <Route path='/signup' element={<SignUp onLogIn={setUser} user={user}/>}/> 
            <Route path='/login' element={<LogIn onLogIn={setUser} user={user}/>}/> 
          </Routes>
            
      </div>
    )
  }
}

{/*comment*/}

export default App;