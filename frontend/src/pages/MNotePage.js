import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Content from '../components/Content'
import ResponsiveDrawer from '../components/ResSidebar';
import DeleteCom from '../components/DeleteCom';
import { useNavigate } from "react-router-dom";


function MNotePage(props) {
  let navigate = useNavigate();
  const [noteid, setNoteid] = useState(null);
  const [notes, setNotes] = useState([]);
  const [note,setNote] = useState({body:''})

  useEffect(() => {
    document.title = "Notes"
    fetchNotes()
    props.setTitle('Notes')

    if (noteid === null) {
      return
    }
    else if (note.body === '') {
      return
    }
    else {
      let interval = setInterval(() => {
        if (localStorage.getItem('access_token')) {
          handleRefresh()
        }
      }, 21100)

      const delayDebounceFn =  setTimeout(async() => {
        console.log(note)
        await axios.put(`/api/note/update/${noteid}/`, note)
        .then(res => {
          if (res.status === 200) {
            console.log(res)
        }else if (res.status === 401) {
          handleRefresh()
        }
      })
      .catch(err => {
          // setNote({body:'Click on the + button to create a new note'})
          console.log(err)
          if (err.response.status === 401 || err.code === 'ERR_BAD_RESPONSE') {
            checkToken()
          }else{
            console.log(err)
            handleRefresh()
          }
      }) 
      // Send Axios request here
    }, 500)
    
    return () => {clearInterval(interval);  clearTimeout(delayDebounceFn)}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }}, [note])



  let handleRefresh = () => {
    // delete axios.defaults.headers.common["Authorization"];
    axios.post('/api/auth/token/refresh/', {refresh: localStorage.getItem('refresh_token')})
    .then(res => {
      console.log(res)
        localStorage.setItem('access_token', res.data.access)
        props.setLogin(true)
        navigate('/mynotes')
      }).catch
      (err => {
        console.log(err)
        // navigate('/login')
    }
    )
  }


  let fetchNotes = () => {
    axios.get('/api/notes/')
    .then(res => {
      setNotes(res.data)
      // console.log(res)
        })
    .catch(err => {
      if (err.response.status === 401) {
        handleRefresh()
      }
    })
    }

    let checkToken = () => {
      delete axios.defaults.headers.common["Authorization"];
      axios.post('/api/auth/token/verify/', {access: localStorage.getItem('access_token')})
      .then(res => {
        if (res.data.code === 'token_not_valid') {
          navigate('/login')
        }})
      .catch(err => {
        console.log(err)
        navigate('/login')
      })
      console.log('checkToken')
      }




  return (
    <div className='main'>
        <div className='side'>
            <ResponsiveDrawer notes={notes} setNotes={setNotes} setNoteid={setNoteid}/>
            </div>
            <div className='content'>
            <Content note={note} setNote={setNote}  setNotes={setNotes} noteid={noteid} />
            <DeleteCom setNote={setNote}  setNotes={setNotes} noteid={noteid} />
        </div>
    </div>
  )
}

export default MNotePage