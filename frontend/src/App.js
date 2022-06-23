import './App.css';
import Login from './pages/Login';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import MNotePage from './pages/MNotePage';
import Home from './pages/Home';
import MHeader from './components/MHeader';
import React, {useState, useEffect} from 'react'
import Register from './pages/Register';

function App() {
  const [login , setLogin] = useState(false);
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('Tasks');

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setLogin(true)
      setUser(localStorage.getItem('username'))
    }
    
  }
  , [])
  return (
    <div>
      <Router>
      <MHeader title={title} setTitle={setTitle} setLogin={setLogin} setUser={setUser} login={login} user={user} />
        <Routes>
            <Route path="/" element={<Home setTitle={setTitle}/>} />
            <Route path="/mynotes" element={<MNotePage setTitle={setTitle} setLogin={setLogin} setUser={setUser}/>} />
            <Route path="/login" element={<Login setLogin={setLogin} setUser={setUser}/>} />
            <Route path="/register" element={<Register setLogin={setLogin} setUser={setUser}/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
 