import React, { useState, useEffect } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useOktaAuth } from '@okta/okta-react';

const LoginButton = () => {
  const { authState, authService } = useOktaAuth();
  const [user, setUser] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (authState.isAuthenticated) {
        const user = await authService.getUser();
        setUser(user);
      }
    };
    checkAuthentication();
  }, [authService, authState.isAuthenticated]);

  const login = () => authService.login('/');
  const logout = () => {
    setMenuAnchorEl(null);
    authService.logout('/');
  };

  const handleMenuOpen = event => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  if (authState.isAuthenticated === null) return null;
  if (!authState.isAuthenticated) return <Button color="inherit" onClick={login}>Login</Button>;

  const menuPosition = {
    vertical: 'top',
    horizontal: 'right',
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={menuAnchorEl}
        anchorOrigin={menuPosition}
        transformOrigin={menuPosition}
        open={!!menuAnchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>
          <ListItemText
            primary="Logout"
            secondary={user && user.name}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LoginButton;
