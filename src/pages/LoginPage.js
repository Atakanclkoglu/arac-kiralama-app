import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Bu satırı eklemen gerekiyor


function LoginPage() {


    const navigate = useNavigate(); // navigate fonksiyonunu kullanıma hazırla

    const handleLogin = () => {
        // Şimdilik API bağlantısı olmadığı için dümenden yönlendirme yapıyoruz
        // Gerçek uygulamada burada API isteği göndereceğiz ve başarılı olursa yönlendireceğiz
        navigate('/anasayfa');
    }

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
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Giriş Yap
            </Button>

            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/sifremi-unuttum">Şifremi unuttum</Link>
            </Typography>


            {/* Bu bölümü eklemen gerekiyor */}
            <Typography variant="body2" sx={{ mt: 2 }}>
                Henüz hesabın yok mu? <Link to="/kaydol">Şimdi kaydol</Link>
            </Typography>
        </Box>
    );
}

export default LoginPage;