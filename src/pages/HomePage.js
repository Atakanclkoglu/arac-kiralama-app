import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';

function HomePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Arama ve filtreleme state'leri
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Bu fonksiyon, filtreleme değerlerine göre API'yi çağıracak
  const fetchCars = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:8001/cars/';
      const params = new URLSearchParams();

      if (searchQuery) {
        params.append('car_name', searchQuery);
      }
      if (minPrice) {
        params.append('min_price', minPrice);
      }
      if (maxPrice) {
        params.append('max_price', maxPrice);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url);
      setCars(response.data);
    } catch (error) {
      console.error("Araba verileri çekilirken bir hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa ilk yüklendiğinde tüm araçları getiren useEffect
  useEffect(() => {
    fetchCars();
  }, []); // Bağımlılık dizisi boş olduğu için sadece sayfa ilk yüklendiğinde çalışır

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
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          label="Araç Ara (Marka, Model, Motor Tipi...)"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TextField
          label="Min. Fiyat"
          variant="outlined"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="Max. Fiyat"
          variant="outlined"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={fetchCars}
        >
          Ara & Filtrele
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