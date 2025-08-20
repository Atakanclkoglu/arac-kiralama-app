import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/kaydol" element={<SignupPage />} />
          <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
          <Route path="/anasayfa" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;