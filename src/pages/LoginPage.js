// src/pages/LoginPage.js
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      setIsLoggedIn(true);
      navigate('/anasayfa');
    } catch (err) {
      setError('Giriş başarısız! Bilgilerinizi kontrol edin.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '300px',
        margin: '50px auto',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Giriş Yap
      </Typography>
      <TextField
        label="Kullanıcı Adı"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        label="Şifre"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Giriş Yap
      </Button>

      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        <Link to="/sifremi-unuttum">Şifremi unuttum</Link>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
        Henüz hesabın yok mu? <Link to="/kaydol">Şimdi kaydol</Link>
      </Typography>
    </Box>
  );
}

export default LoginPage;