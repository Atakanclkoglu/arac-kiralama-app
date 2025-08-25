import { Avatar, Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfilePage({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      axios.get('http://localhost:8000/api/users/me/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false);
    navigate('/');
  };

  if (!user) return <div>Yükleniyor...</div>;

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: 4, 
        width: '600px', 
        margin: '50px auto' 
      }}
    >
      <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main' }}>
        {user.name ? user.name.charAt(0) : user.username.charAt(0)}
      </Avatar>
      <Typography variant="h4" component="h1" gutterBottom>
        {user.name || user.username}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {user.email}
      </Typography>
      <Button 
        variant="contained" 
        color="secondary" 
        sx={{ mt: 3 }} 
        onClick={handleLogout}
      >
        Çıkış Yap
      </Button>
      {/* Geçmiş kiralamalar özelliği backend'den gelmiyorsa bu kısmı şimdilik gizle */}
      {/* 
      <Paper sx={{ mt: 4, width: '100%', p: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Geçmiş Kiralamalar
        </Typography>
        <List>
          {user.pastRentals && user.pastRentals.length > 0 ? (
            user.pastRentals.map((rental) => (
              <ListItem key={rental.id}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <DirectionsCarIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={rental.car}
                  secondary={`Tarih: ${rental.startDate} - ${rental.endDate}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              Henüz geçmiş kiralamanız yok.
            </Typography>
          )}
        </List>
      </Paper>
      */}
    </Box>
  );
}

export default UserProfilePage;