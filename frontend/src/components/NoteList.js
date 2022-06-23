import {List, ListItem, ListItemText, Divider} from '@mui/material';

function NoteList(props) {


  let notes = props.notes


    const getTitle = (note) => {
      let title = note.body
      if (title) {
        title = note.body.split('\n')[0]
      }else{
        title = 'Untitled'}
      if (title.length > 45) {
        title = title.substring(0, 45) + '...'
      }
      return title
    }

    const getDate = (note) => {
      return new Date(note.updated_at).toLocaleString()
    }

    const setNoteID = (note) => {
      props.setNoteid(note.id)
    }

    const mappedNoteList = notes.map((note, index) => {
      return(
        <div className='notehov' key={index}>
        <Divider variant="fullWidth" component="li" />
        <ListItem onClick={() => {setNoteID(note)}}>
          <ListItemText primary={getTitle(note)} secondary={getDate(note)}
          classes={{primary: 'note-title', secondary: 'note-date'}}
          />
          {/* <Content noteid={note.id}/> */}
        </ListItem>
        </div>)
    }
    )


  return (
    <div>
    <List className='note-list'>
      {mappedNoteList}    
    </List>
    </div>

)
}




export default NoteList