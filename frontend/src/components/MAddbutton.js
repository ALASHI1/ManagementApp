import axios from 'axios'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
function MAddbutton(props) {

  let noteeees = ({body:'New note'})
  
  let fetchNotes = () => {
    axios.get('/api/notes/')
    .then(res => {
      props.setNotes(res.data)
        })

    }



  let createNote = async() => {
    await axios.post('/api/note/create/', noteeees)
    .then(res => {
        fetchNotes()

    })  } 
  return (
    <AddOutlinedIcon
        className='add-button'
        onClick={() => {createNote()}}
    />
  )
}

export default MAddbutton