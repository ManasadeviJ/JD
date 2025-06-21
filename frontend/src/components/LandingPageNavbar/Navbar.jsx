import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from '@mui/icons-material';
import './Navbar.css';
import logoImage from '../../assets/logo.png?url';
import notificationIcon from '../../assets/notification-icon.svg?url';
import { useSelector } from 'react-redux'; // Import useSelector
import profileAvatar from '../../assets/profile-avatar.png?url';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const cartItems = useSelector(state => state.cart.cart); // Access cart from Redux store
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); // Calculate total quantity

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { text: 'Game Modes', path: '/game-modes' },
    { text: 'Marketplace', path: '/shop' },
    { text: 'Socials', path: '#' },
    { text: 'Newsletter', path: '#' },
    { text: 'Avatar Store', path: '#' },
    { text: 'IR icon', path: '#' },
  ];

  const renderMobileMenu = (
    <Drawer
      anchor='right'
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      sx={{ '.MuiDrawer-paper': { 
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          backdropFilter: 'blur(10px)',
          color: 'white' 
        } 
      }}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={RouterLink}
              to={item.path}
              onClick={toggleMobileMenu}
              button
            >
              <ListItemText primary={item.text} sx={{ color: 'white' }} />
            </ListItem>
          ))}
          <Divider sx={{ bgcolor: '#444' }} />
          {/* Added Wishlist and Cart to mobile menu */}
          <ListItem
            component={RouterLink}
            to='/wishlist'
            onClick={toggleMobileMenu}
            button
          >
            <ListItemText primary='Wishlist' sx={{ color: 'white' }} />
          </ListItem>
          <ListItem
            component={RouterLink}
            to='/cart'
            onClick={toggleMobileMenu}
            button
          >
            <ListItemText primary='Cart' sx={{ color: 'white' }} />
          </ListItem>
          <ListItem
            component={RouterLink}
            to='/profile'
            onClick={toggleMobileMenu}
            button
          >
            <ListItemText primary='Profile' sx={{ color: 'white' }} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      sx={{
        width: '100%',
        color: 'white',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Toolbar sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '0 1rem' : '0 2rem',
        minHeight: '60px !important'
      }}>
        {isMobile ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <RouterLink to="/">
                <img src={logoImage} alt="Logo" style={{ height: '32px', width: 'auto' }} />
              </RouterLink>
              <Box>
                <IconButton color="inherit" component={RouterLink} to="/profile">
                  <img src={profileAvatar} alt="Profile" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={toggleMobileMenu}
                  sx={{ color: 'white' }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
            {renderMobileMenu}
          </>
        ) : (
          <> {/* Fragment to group left and right sections for desktop */}
            {/* Left side: Logo and Navigation Links */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RouterLink to="/">
                <img src={logoImage} alt="Logo" style={{ height: '40px', width: 'auto', marginRight: '2rem' }} />
              </RouterLink>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: 'white',
                      fontSize: '16px',
                      textTransform: 'capitalize',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '0%',
                        height: '2px',
                        bottom: '-4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(85.68deg, #9333ea, #fffefe)',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                      '&.active::after': {
                        width: '100%',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Right side: Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IconButton color="inherit" component={RouterLink} to="/wishlist">
                <FavoriteBorderOutlinedIcon />
                {/* You can add a wishlist count here if needed */}
              </IconButton>
              <IconButton color="inherit" component={RouterLink} to="/cart">
                <ShoppingCartOutlinedIcon />
                {totalCartItems > 0 && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: '#9333ea',
                      borderRadius: '50%',
                      width: 16,
                      height: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    {totalCartItems}
                  </Typography>
                )}
              </IconButton>
              <IconButton color="inherit">
                <img src={notificationIcon} alt="Notifications" style={{ width: '24px', height: '24px' }} />
              </IconButton>
              <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                <img src={profileAvatar} alt="Profile" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
              </IconButton>
            </Box>
          </>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleProfileMenuClose} component={RouterLink} to="/profile">Profile</MenuItem>
          <MenuItem onClick={handleProfileMenuClose} component={RouterLink} to="/orders">Orders</MenuItem>
          <MenuItem onClick={handleProfileMenuClose} component={RouterLink} to="/settings">Settings</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;