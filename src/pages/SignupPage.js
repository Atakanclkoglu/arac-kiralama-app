import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    phone_number: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/users/', form);
      setMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
    } catch (err) {
      setMessage('Kayıt başarısız! Bilgilerinizi kontrol edin.');
    }
  };

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit}
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
        Kayıt Ol
      </Typography>
      <TextField
        label="Kullanıcı Adı"
        name="username"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={form.username}
        onChange={handleChange}
        required
      />
      <TextField
        label="E-posta"
        name="email"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={form.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Ad Soyad"
        name="name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={form.name}
        onChange={handleChange}
      />
      <TextField
        label="Telefon"
        name="phone_number"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={form.phone_number}
        onChange={handleChange}
      />
      <TextField
        label="Şifre"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={form.password}
        onChange={handleChange}
        required
      />
      <Button variant="contained" color="primary" fullWidth type="submit">
        Kayıt Ol
      </Button>
      {message && (
        <Typography sx={{ mt: 2, color: message.includes('başarılı') ? 'green' : 'red' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default SignupPage;