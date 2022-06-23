import React, {useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NoteList from './NoteList';
import Search from './Search';
import MAddbutton from './MAddbutton';
import axios from 'axios'

const drawerWidth = 252;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  let notes = props.notes
  let setNotes = props.setNotes

  useEffect(() => {
    fetchNotes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let fetchNotes = () => {
    axios.get('/api/notes/')
    .then(res => {
      setNotes(res.data)
        })

    }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div>
        <Search setNotes={setNotes}/>
        <NoteList notes={notes} setNotes={setNotes} setNoteid={props.setNoteid}/>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Typography variant="h6" noWrap>
          My Notes
        </Typography>
          </IconButton>
        </Toolbar>
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'unset', maxHeight: 490 },
            '& .MuiDrawer-root': { position: 'unset'},
          }}
        >
          {drawer}
          <div>
        <MAddbutton notes={notes} setNotes={setNotes}/>
      </div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'unset',  maxHeight: 490 },
            '& .MuiDrawer-root': { position: 'unset'},
          }}
          open
        >
          {drawer}
        </Drawer>
        <div>
        <MAddbutton notes={notes} setNotes={setNotes}/>
      </div>
      </Box>
    </div>
  );
}


export default ResponsiveDrawer;
