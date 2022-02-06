import './App.css';
import LogIn from './authentication/LogIn';  
import SignUp from './authentication/SignUp';  
import Dashboard from './Dashboard';
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUser, setStatus } from './features/user/userSlice'

const App = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.entity);

  useEffect(() => {
    fetch("/self").then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          dispatch(setUser(user))
        })
      }else{
        dispatch(setStatus('failed'))
      }
    });
  }, []); 

  if (user) {
    return(
      <div className="App">
          <Routes>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path="/*" element={<Navigate to="/dashboard" />}/>
          </Routes>
      </div>
    )
  } else {
    return(
      <div className="App">
          <Routes>
            <Route path='/signup' element={<SignUp />}/> 
            <Route path='/' element={<LogIn />}/> 
          </Routes>
            
      </div>
    )
  } 
}

export default App;