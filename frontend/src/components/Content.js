import React, {useEffect} from 'react'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Content(props) {
  let navigate = useNavigate();
  let noteid = props.noteid
  let note = props.note
  let setNote = props.setNote
  useEffect(() => {
    getNote()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteid])


  let getNote = async() => {
    if (noteid === null) {return}
      await axios.get(`/api/note/${noteid}`)
      .then(res => {
          setNote(res.data)
          // fetchNotes()
      })
      .catch(err => {
        if (err.response.status === 401) {
                navigate('/login')
              }
        // setNote({body:'Click on the + button to create a new note'})
      })
  }


  return (
              <TextareaAutosize
                aria-label="empty textarea"
                className='textarea'
                style={{overflow: 'scroll',height: "100%"}}
                onChange={(e) => setNote({...note,'body':e.target.value})}
                // onInput={() => updateNote()}
                // onPaste={updateNote}
                // onBlur={updateNote}
                // onKeyDown={updateNote}
                // onKeyUp={updateNote}
                placeholder="Click on the + button to create a new note"
                value={note?.body}
                />
  )
}

export default Content