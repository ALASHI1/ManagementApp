import React from 'react'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axios from 'axios'
function DeleteCom(props) {


  let fetchNotes = () => {
    axios.get('/api/notes/')
    .then(res => {
      props.setNotes(res.data)
        })

    }

  let deleteNote = async() => {
    props.setNote({body:''})
    await axios.delete(`/api/note/delete/${props.noteid}`)
    .then(res => {  
      fetchNotes()
    }).catch(err => {
      // props.setNote({body:'select a note to delete'})
  }
    )
  }


  return (
    <DeleteForeverOutlinedIcon
    onClick={deleteNote}
    />
  )
}

export default DeleteCom