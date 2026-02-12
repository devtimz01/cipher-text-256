import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registration } from './pages/registration';
import { Login } from './pages/login';
import { Home } from './components/Home';
import { CipherText } from './pages/create-cipher-text';
import { ShareCipherText } from './pages/share-cipher-text';
import { Notification } from './pages/notification';


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/ciphertext" element={<CipherText />} />
        <Route path="/sharetext" element={<ShareCipherText />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}
