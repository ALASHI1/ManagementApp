import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";



export default function ButtonAppBar(props) {
    let navigate = useNavigate();

    let handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('username')
        props.setLogin(false)
        props.setUser('')
        props.setTitle('Tasks')
        navigate('/login')
      }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
      style={{backgroundColor:"white", color:"black"}}
      position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props?.user.toUpperCase()} <Button style={{fontSize:22}} href='/' color="inherit">{props.title.toUpperCase()}</Button>
          </Typography>
          {props.login ?( <Button onClick={handleLogout} color="inherit">Logout</Button>): (
            <Button  href='/login' color="inherit">Login</Button>)
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}