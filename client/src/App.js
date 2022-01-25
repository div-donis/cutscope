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
      }
    });
  }, []); 

  if (user) {
    return(
      <div className="App">
          <Routes>
            <Route exact path='/' element={<Dashboard onLogOut={setUser} user={user}/>}/>
          </Routes>
      </div>
    )
  } else {
    return(
      <div className="App">
          <Routes>
            <Route path='/signup' element={<SignUp onLogIn={setUser} user={user}/>}/> 
            <Route path='/' element={<LogIn onLogIn={setUser} user={user}/>}/> 
          </Routes>
            
      </div>
    )
  }
}

export default App;