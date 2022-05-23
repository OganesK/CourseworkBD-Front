import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Button } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../config';
import WareHouseTable from '../../Components/Home/WareHouseTable';

const drawerWidth = 240;

const Home: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const avialableSectionsForAdmin = ['Warehouse', 'Distributor', 'Shops', 'Shipments'];
  const avialableSectionsForWorker = ['Warehouse', 'Not approved shipments', 'Not approved requests'];
  const avialableSectionsForShop = ['Warehouse', 'Requests'];
  const avialableSectionsForDist = ['Distributor'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number, section: string) => {
    setSelectedSection(section);
    setSelectedIndex(index);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {localStorage.getItem('role') === 'ADMINISTRATOR' ? (
          avialableSectionsForAdmin.map(section => (
            <ListItem
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0, section)}
              button
              key={section}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={section} />
            </ListItem>
          ))
        ) : localStorage.getItem('role') === 'SHOP_OWNER' ? (
          avialableSectionsForShop.map(section => (
            <ListItem
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0, section)}
              button
              key={section}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={section} />
            </ListItem>
          ))
        ) : localStorage.getItem('role') === 'FIRM_OWNER' ? (
          avialableSectionsForDist.map(section => (
            <ListItem
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0, section)}
              button
              key={section}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={section} />
            </ListItem>
          ))
        ) : localStorage.getItem('role') === 'MANAGER' ? (
          avialableSectionsForWorker.map(section => (
            <ListItem
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0, section)}
              button
              key={section}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={section} />
            </ListItem>
          ))
        ) : (
          <></>
        )}
      </List>
      <Divider />
      <List>
        <ListItem
          selected={selectedIndex === 4}
          onClick={event => handleListItemClick(event, 4, 'Daily report')}
          button
          key={'DailyReport'}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary={'Daily report'} />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  const logOutButtonHandler = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Warehouse
          </Typography>
          <Button color="inherit" onClick={() => logOutButtonHandler()}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <WareHouseTable selectedSection={selectedSection} selectedIndex={selectedIndex} />
      </Box>
    </Box>
  );
};

export default Home;
