// src/components/CarCard.js
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function CarCard({ car }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={car.image_url} // Değiştirildi
        alt={car.model}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.brand} {car.model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Günlük: {car.price_per_day} TL
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Link to={`/rezervasyon/${car.id}`} style={{ textDecoration: 'none' }}>
          <Button size="small" variant="contained">
            Kirala
          </Button>
        </Link>
      </Box>
    </Card>
  );
}

export default CarCard;