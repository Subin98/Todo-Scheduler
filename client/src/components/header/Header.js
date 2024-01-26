import React from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetAuthenticationState } from '../../state/authenticationSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Icon } from '@mui/material';
const pages = ['Dashboard', 'View All Todos'];

function Header() {
  const { authentication } = useSelector((store) => store);
  const user = authentication?.userName.charAt(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log('handleOpenUserMenu');
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignOut = () => {
    dispatch(resetAuthenticationState());
    dispatch(logout());
    navigate('login');
  };
  const handleClick = () => {
    navigate('/');
  };
  return (
    <AppBar position="fixed" sx={{ backgroundColor: `#6a5bac`, backgroundSize: 'cover' }} id="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon
            onClick={() => user && handleClick()}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }}>
            <img src={logo}></img>
          </Icon>
          {/* <ListAltIcon
            
            onClick={() => user && handleClick}
          /> */}

          {user ? (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            ''
          )}
          <Icon
            onClick={() => user && handleClick}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer' }}>
            <img src={logo}></img>
          </Icon>

          {user ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex', alignItems: 'right', justifyContent: 'right', marginRight: '5%' }
              }}>
              {pages.map((page) => (
                <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page}
                </Button>
              ))}
            </Box>
          ) : (
            ''
          )}
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user ? (
                    <Avatar sx={{ bgcolor: '#dbd5b2', color: '#6A5BAC' }}>{user}</Avatar>
                  ) : (
                    <Avatar src="/broken-image.jpg" />
                  )}
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {/* <MenuItem onClick={handleCloseUserMenu}>
    <Typography textAlign="center">Dashboard</Typography>
  </MenuItem> */}
                <MenuItem onClick={handleSignOut}>
                  <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            ''
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
