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
                label={<SearchIcon 
                style={{width: '11px', height: '11px', marginBottom: '112px'}}
                />}
                className='search'
                style={{width: '180px', marginLeft: '28px'}}
                onChange={handleSearch}
                inputProps={{
                  style: {
                    fontSize: '13px',
                    height: '10px',
                  }
                }}
              

              />
  )
}

export default Search