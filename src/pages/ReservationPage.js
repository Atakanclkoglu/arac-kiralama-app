// src/pages/ReservationPage.js
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ReservationPage() {
  const { carId } = useParams();

  // State'leri tanımla
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect, tarih state'leri değiştiğinde otomatik olarak çalışır
  useEffect(() => {
    // Sadece hem başlangıç hem de bitiş tarihi seçilmişse fiyatı hesapla
    if (startDate && endDate && startDate.isValid() && endDate.isValid()) {
      handleCalculatePrice();
    } else {
      // Tarihlerden biri eksikse fiyatı sıfırla ve hata mesajını temizle
      setTotalPrice(null);
      setError(null);
    }
  }, [startDate, endDate]); // startDate veya endDate değiştiğinde bu fonksiyonu tekrar çalıştır

  // Fiyatı hesaplamak için API'ye POST isteği gönderen asenkron fonksiyon
  const handleCalculatePrice = async () => {
    setLoading(true);
    setError(null);

    // API'ye gönderilecek veri nesnesini oluştur
    const bookingData = {
      car_id: parseInt(carId),
      start_date: dayjs(startDate).format('YYYY-MM-DD'),
      end_date: dayjs(endDate).format('YYYY-MM-DD'),
    };

    try {
      const response = await fetch('http://localhost:8002/api/v1/booking/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        // API'den bir hata cevabı geldiyse
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Fiyat hesaplama hatası.');
      }

      // API'den başarılı cevap gelirse toplam fiyatı al
      const result = await response.json();
      setTotalPrice(result.total_price);
    } catch (err) {
      // İstek sırasında bir hata oluşursa (örneğin ağ hatası)
      console.error("API'ye bağlanırken hata:", err);
      setError(err.message);
      setTotalPrice(null);
    } finally {
      setLoading(false);
    }
  };

  // Onayla butonuna basıldığında çalışacak fonksiyon
  const handleCompleteReservation = () => {
    // Rezervasyonu tamamlama mantığı buraya eklenecek
    alert(`Rezervasyonunuz onaylandı! Toplam fiyat: ${totalPrice} TL`);
    // Kullanıcıyı ödeme sayfasına yönlendirebilir veya yeni bir API isteği atabilirsiniz.
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '400px',
        margin: '50px auto',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Rezervasyon Yap ({carId} Numaralı Araç)
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Başlangıç Tarihi"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          sx={{ mb: 2, width: '100%' }}
        />
        <DatePicker
          label="Bitiş Tarihi"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          sx={{ mb: 2, width: '100%' }}
        />
      </LocalizationProvider>
      
      {/* Yükleniyor ve hata mesajları */}
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && <Typography color="error" sx={{ mt: 2 }}>Hata: {error}</Typography>}
      
      {/* Toplam fiyatı gösterme alanı */}
      {totalPrice !== null && (
        <Box sx={{ mt: 2, p: 2, bgcolor: '#e0f7fa', borderRadius: '4px', width: '100%', textAlign: 'center' }}>
          <Typography variant="h6">Toplam Fiyat:</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{totalPrice} TL</Typography>
        </Box>
      )}

      {/* Fiyat hesaplandığında gösterilecek butonlar */}
      {totalPrice !== null && (
        <Box sx={{ mt: 2, width: '100%', display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleCompleteReservation}
          >
            Rezervasyonu Onayla
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
              setTotalPrice(null);
            }}
          >
            İptal Et
          </Button>
        </Box>
      )}

      {/* Tarihler seçilmemişken gösterilecek Fiyat Hesapla butonu */}
      {(totalPrice === null && !loading && !error) && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!startDate || !endDate}
          onClick={handleCalculatePrice}
        >
          Fiyatı Hesapla
        </Button>
      )}
    </Box>
  );
}

export default ReservationPage;