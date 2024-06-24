import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/AutoStories';
import config from '../config';
import HandleUserProfile from './UserProfile';

const pages = ['Students Performance'];
const settings = ['User Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserProfileSubmit = async (formData) => {
    // Handle form submission logic here
    try {
      const response = await fetch(

        `${config.apiBaseUrl}/studentsData/userProfile/${formData.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      fetchUserImageUrl() //called here so that image gets refreshed when user profile updated
      if (response.ok) {
          // Display a success alert
          alert("User Details updated successfully");
          
      } else {
        // Display an alert for server error
        const responseData = await response.json();
        alert(responseData.error);
        console.error("Server error:", response.status, response.statusText);
      }
    } catch (err) {
      console.error(err.message);
    }

    console.log('Form submitted with data:', formData);

    setIsUserProfileOpen(false); // Close the UserProfile dialog after submission
  };

  const handleItemClick = (itemName) => async () => {
    console.log(`${itemName} clicked`);

    if (itemName === 'User Profile') {
      setIsUserProfileOpen(true);
    }

    if (itemName === 'Students Performance') {
      try {
        window.location = "/performance";
      } catch (err) {
        console.log(err.message);
      }
    }

    if (itemName === 'Logout') {
      handleCloseUserMenu();
      await handleLogout();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/studentsData/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      window.location = '/';
      console.log('Logout successful');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

   // Fetch user image URL when the user profile is opened
  
   const fetchUserImageUrl = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/studentsData/image`);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log('data:');
        setProfileImageUrl(data[1].image); // Update the profile image URL state
      } else {
        console.error("Server error:", response.status, response.statusText);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(()=>{
      fetchUserImageUrl();
  }, []);



  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, rgba(209, 94, 30), rgba(20, 58, 138))', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home" //refresh the page when click on Logo
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'sans-serif',
              fontWeight: 900,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Lawrence International
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem    key={page} onClick={handleItemClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'sans-serif',
              fontWeight: 700,
              letterSpacing: '0.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Lawrence International
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleItemClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="aa" src={`data:image/jpeg;base64,${profileImageUrl}`} style={{ width: "50px", height: "50px" }}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleItemClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <HandleUserProfile
            open={isUserProfileOpen}
            handleClose={() => setIsUserProfileOpen(false)}
            handleSubmit={handleUserProfileSubmit}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;