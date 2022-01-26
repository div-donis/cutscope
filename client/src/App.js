import './App.css';
import LogIn from './LogIn';  
import SignUp from './SignUp';  
import Dashboard from './Dashboard';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from './features/user/userSlice'

const App = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.entity);

  const navigate = useNavigate()

  useEffect(() => {
    fetch("/self").then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          dispatch(setUser(user))
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
            <Route path='/login' element={<LogIn onLogIn={setUser} user={user}/>}/> 
          </Routes>
            
      </div>
    )
  }
}

export default App;