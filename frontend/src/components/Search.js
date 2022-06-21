import React from 'react'
import {TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'


function Search(props) {

  let handleSearch = (e) => {
    axios.get(`/api/notes/?search=${e.target.value}`)
    .then(res => {
      props.setNotes(res.data)
    }
    )}




  return (
                <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label={<SearchIcon />}
                className='search'
                style={{width: '252px', marginLeft: '38px'}}
                onChange={handleSearch}
              />
  )
}

export default Search