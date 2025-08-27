// src/components/CarCard.js
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function CarCard({ car }) {
    if (!car) {
        return null;
    }

    // Varsayılan bir resim kullan
    const imageUrl = "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebird-170811.jpg&fm=jpg";

    return (
        <Card sx={{ 
            maxWidth: 345, 
            m: 2, 
            height: '100%',
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={car.car_name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {car.company} {car.car_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Motor: {car.engine}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Yakıt Tipi: {car.fuel_type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Hız: {car.total_speed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    0-100 km/h: {car.performance_0_100_kmh}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tork: {car.torque}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Günlük: {car.daily_price} TL
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

export default React.memo(CarCard);