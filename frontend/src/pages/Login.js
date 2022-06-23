import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import { Box, OutlinedInput, InputLabel, FormControl, Button, Typography, FormHelperText} from '@mui/material';


function Login(props) {
  let navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  let access = localStorage.getItem('access_token')

  useEffect(() => {
    document.title = "Login"
      if (localStorage.getItem('access_token')) {
        handleRefresh()
      }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [access])


  let handleLogin = (e) => {
    e.preventDefault()
    delete axios.defaults.headers.common["Authorization"];
    axios.post('/api/auth/login/', {email, password})
    .then(res => {
      console.log(res)
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        localStorage.setItem('username', res.data.user.username)
        props.setLogin(true)
        props.setUser(res.data.user.username)
        console.log(document.cookie)
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        navigate('/mynotes')
    }).catch
    (err => { 
      console.log(err) 
      setError('Invalid Email or Password')
    })
  }


  let handleRefresh = () => {
    console.log(localStorage.getItem('refresh_token'))
    axios.post('/api/auth/token/refresh/', {refresh: localStorage.getItem('refresh_token')})
    .then(res => {
      console.log(res)
        localStorage.setItem('access_token', res.data.access)
        props.setLogin(true)
        console.log(document.cookie)
        navigate('/mynotes')
      }).catch
      (err => { 
        console.log(err) 
        setError('Invalid Email or Password')
        handleLogout()
      })
    }

  let handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('username')
    props.setLogin(false)
    props.setUser('')
    navigate('/login')
  }

  return (
    <div>
        <Box
        component={"form"}
        display={"flex"}
        flexDirection={"column"}
        onSubmit={handleLogin}
        maxWidth= {330}
        margin={'auto'}
        bgcolor = {"white"}
        padding={6}
        marginTop={30}
        borderRadius={10}
        sx={{
          '& > :not(style)': { m: 1 },
        }}

        >
        <FormControl
        margin={'normal'}
        >
        <InputLabel htmlFor="component-outlined">Email</InputLabel>
          <OutlinedInput
            type={'email'} 
            // labelText={"Email" }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={'email'}
            />
          </FormControl>

          <FormControl
           margin={'normal'}
           >
         <InputLabel htmlFor="component-outlined">Password</InputLabel>
             <OutlinedInput
            type={'password'} 
            
            // labelText={"Password" }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name={'password'}
             />
            </FormControl>
            
            <Button style={{marginTop:'30px'}} variant="contained" type={'submit'}>Login</Button>
            <FormHelperText
            id="component-helper-text">
                {error?(error):(null)}
             </FormHelperText>

            <Typography variant="body2" color="error">
              Dont have an account? <Link to="/register">Register</Link>
              </Typography>
        </Box>
    </div>
  )
}

      
export default Login