// Menu.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const menuItems = [
  { label: 'Thực đơn', path: '/' },
  { label: 'Khuyến mãi', path: '/Promotions' },
];

const DropdownMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              backgroundColor: 'primary', 
            },
          }}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.label} onClick={handleMenuClose}>
              <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body1" style={{ color: '#333' }}> 
                  {item.label}
                </Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DropdownMenu;
