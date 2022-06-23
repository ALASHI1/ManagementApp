import React,{useEffect} from 'react'
import { Box, Card, CardContent, Toolbar, Button, Typography} from '@mui/material';
import Task from '../assets/Task.svg'
import Background from '../components/Background';


function Home(props) {
  useEffect(() => {
    document.title = "Home"
    props.setTitle("Tasks")
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [])

  const handleComingsoon = () => {
    alert("In Progress")
  }


  return (
    <div>
      <Toolbar/>
       <Box
        component="img"
        alt="The house from the offer."
        sx={{
          width: '100%',
          height: '100%',
          margin: '0 auto',
          display: 'block',
          maxWidth: 'fit-content',
        }}
        src={Task}
      />

      {/* <Link to='/login'> */}
        <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent:"center"
        }}
        >
      <Button href='/login'>
        <Card variant="outlined" sx={{ minWidth: 275, minHeight:275 }}>
              <CardContent 
                style={{textAlign:"center", marginTop: "90px"}}>
                  <Typography variant="h5" component="h2">
                    NOTES
                  </Typography>
                </CardContent>
          </Card>
        </Button>

        <Button onClick={() => {handleComingsoon()}}>
          <Card variant="outlined" sx={{ minWidth: 275, minHeight:275 }}>
          <CardContent 
          style={{textAlign:"center",marginTop: "90px"}}>
            <Typography variant="h5" component="h2">
              TODOS
            </Typography>
            </CardContent>
          </Card>
          </Button>
        </Box>
        
        {/* </Link> */}
        <Background/>
    </div>
  )
}

export default Home