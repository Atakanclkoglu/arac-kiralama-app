
import { Box, Button, TextField, Typography } from '@mui/material'; // MUI bileşenlerini import et

function SignupPage() {
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
       Kayıt Ol
      </Typography>
      <TextField 
        label="E-posta" 
        variant="outlined" 
        fullWidth 
        sx={{ mb: 2 }} 
      />
      <TextField
        label="Şifre"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }} 
      />
      <Button variant="contained" color="primary" fullWidth>
        Kayıt Ol
      </Button>
    </Box>
  );
}

export default SignupPage;