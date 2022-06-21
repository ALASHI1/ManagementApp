import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import { Box, OutlinedInput, InputLabel, FormControl, Button, Typography, FormHelperText} from '@mui/material';




function Register() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password1, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        handlePasswordMatch()
        document.title = "Register"
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password2])



    let handleRegister = (e) => {
        e.preventDefault()
        axios.post('/api/auth/registration/', {username, email, password1, password2})
        .then(res => {
            console.log(res)
            if (res.data.error) {
                setError(res.data.error)
                console.log(error)
            } else {
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('refresh_token', res.data.refresh_token)
                localStorage.setItem('username', res.data.user.username)
                navigate('/login')
            }
        }
        )
    }

    let handlePasswordMatch = () => {
        if (password1 !== password2) {
            setError('Passwords do not match')
        }else if (password1 === password2 && password1.length > 3) {
            setError('A Match')
        }

    }




  return (
    <div>
        <Box
        component={"form"}
        display={"flex"}
        flexDirection={"column"}
        onSubmit={handleRegister}
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
        <InputLabel htmlFor="component-outlined">Username</InputLabel>
          <OutlinedInput
            type={'username'} 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name={'username'}
            />
          </FormControl>

          <FormControl
        margin={'normal'}
        >
        <InputLabel htmlFor="component-outlined">Email</InputLabel>
          <OutlinedInput
            type={'email'} 
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
            value={password1}
            onChange={(e) => setPassword(e.target.value)}
            name={'password'}
            />
          </FormControl>



          <FormControl
           margin={'normal'}
           >
         <InputLabel htmlFor="component-outlined">Re-Password</InputLabel>
             <OutlinedInput
            type={'password'} 
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            name={'password2'}
             />
             <FormHelperText
            id="component-helper-text">
                {error?(error):(null)}
             </FormHelperText>
            </FormControl>
            <Button style={{marginTop:'30px'}} variant="contained" type={'submit'}>Register</Button>
            <Typography variant="body2" color="error">
              Already have an account? <Link to="/login">Login</Link>
              </Typography>
        </Box>
    </div>
  )
}

export default Register