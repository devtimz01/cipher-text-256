import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registration } from './components/registration';
import { Login } from './pages/login';
import { Home } from './components/Home';
import { CipherText } from './pages/create-cipher-text';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/ciphertext" element={<CipherText />} />
      </Routes>
    </BrowserRouter>
  );
}
