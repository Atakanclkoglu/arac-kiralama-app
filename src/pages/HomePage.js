import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';

function HomePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sayfa yüklendiğinde tüm araçları getiren ilk useEffect
  useEffect(() => {
    const fetchAllCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8001/cars/');
        setCars(response.data);
      } catch (error) {
        console.error("Araba verileri çekilirken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCars();
  }, []); // Bağımlılık dizisi boş olduğu için sadece sayfa ilk yüklendiğinde çalışır

  // Arama butonu tıklandığında çalışacak fonksiyon
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8001/cars/?q=${searchQuery}`);
      setCars(response.data);
    } catch (error) {
      console.error("Arama yapılırken bir hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">
          Veriler yükleniyor...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Kiralanabilir Araçlar
      </Typography>
      
      {/* Arama çubuğu ve butonu */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Araç Ara (Marka, Model, Motor Tipi...)"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSearch}
        >
          Ara
        </Button>
      </Box>

      {cars.length === 0 && !loading ? (
        <Typography variant="h6" align="center">
          Aradığınız kriterlere uygun araç bulunamadı.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {cars.map((car) => (
            <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
              <CarCard car={car} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HomePage;