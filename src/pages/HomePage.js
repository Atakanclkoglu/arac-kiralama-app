import { Box, Typography } from '@mui/material';

function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
        width: '80%',
        margin: '50px auto',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Hoş Geldiniz!
      </Typography>
      <Typography variant="h6" component="h2" sx={{ mb: 4 }}>
        Kiralık araçlar listesi burada olacak.
      </Typography>
      {/* Araç kartları bu alana gelecek */}
    </Box>
  );
}

export default HomePage;