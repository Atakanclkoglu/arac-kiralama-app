// src/components/Header.js
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/anasayfa" style={{ textDecoration: 'none', color: 'inherit' }}>
            Araba Kiralama Uygulaması
          </Link>
        </Typography>
        <Box>
          {isLoggedIn ? (
            <Button color="inherit" component={Link} to="/profil">
              Hesabım
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/">
              Giriş Yap
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;