import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';

function HomePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8001/cars/'); 
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Araba verileri çekilirken bir hata oluştu:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

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
      <Grid container spacing={4}>
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
            <CarCard car={car} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;