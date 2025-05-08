import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../AppRedux/userSlice'; 

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const isLoggedIn = useSelector((state) => !!state.user.token); // Check if the user is logged in
  const userEmail = useSelector((state) => state.user.profile?.email); // Get user email from Redux
  const cart = useSelector((state) => state.cart); // Access cart state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total items in the cart
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login'); // Redirect to the login page
    handleClose(); // Close the menu
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            ShopSite
          </Link>
        </Typography>

        {/* Cart Icon */}
        <IconButton
          size="large"
          aria-label="show cart items"
          color="inherit"
          component={Link}
          to="/cart"
        >
          <Badge badgeContent={totalCartItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Favorite Icon */}
        <IconButton size="large" aria-label="show favorite items" color="inherit">
          <Badge badgeContent={2} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        {/* Profile.. Icon */}
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          color="inherit"
          onClick={handleProfileClick}
        >
          <AccountCircle />
        </IconButton>

        {/* Profile Dropdown... */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {isLoggedIn ? (
            <>
              <MenuItem onClick={handleClose}>Email: {userEmail}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;