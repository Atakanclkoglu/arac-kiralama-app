import { useState } from 'react'; // useState'i import et
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header'; // Header bileşenini import et
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ReservationPage from './pages/ReservationPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giriş durumunu tutacak state

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} /> {/* Header'ı buraya ekle */}
        <Routes>
          <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} /> 
          <Route path="/kaydol" element={<SignupPage />} />
          <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
          <Route path="/anasayfa" element={<HomePage />} />
          <Route path="/rezervasyon/:carId" element={<ReservationPage />} />
          <Route path="/profil" element={<UserProfilePage setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;