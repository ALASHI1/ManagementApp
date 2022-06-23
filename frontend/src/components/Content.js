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
    // handleNull()
    getNote()
    
    // console.log(noteid)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteid])

  let getNote = async() => {
    if (noteid === null) {
     return setNote({...note,'body':''})
    }
    
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

  // let handleNull = () => {
  //   if (noteid === null) {
  //     setNote({...note,'body':''})
  //   }
  //   else{
  //     getNote()
  //   }
  // }


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