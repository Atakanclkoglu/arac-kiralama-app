import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
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
        Şifremi Unuttum
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 2 }}>
        Lütfen hesap e-postanızı girin.
      </Typography>
      <TextField 
        label="E-posta" 
        variant="outlined" 
        fullWidth 
        sx={{ mb: 2 }} 
      />
      <Button variant="contained" color="primary" fullWidth>
        Gönder
      </Button>
      <Link to="/" style={{ marginTop: '16px' }}>Giriş Sayfasına Dön</Link>
    </Box>
  );
}

export default ForgotPasswordPage;