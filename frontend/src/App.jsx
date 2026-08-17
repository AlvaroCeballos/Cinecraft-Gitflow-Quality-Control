import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminRequests from './pages/AdminRequests';
import AdminRequestHistory from './pages/AdminRequestHistory';
import Reviews from './pages/Reviews';
import SharedWithMe from './pages/SharedWithMe';
import SharedByMe from './pages/SharedByMe';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/admin/requests/history" element={<AdminRequestHistory />} />
            <Route path="/reviews" element={<Reviews />} />  
            <Route path="/shared-with-me" element={<SharedWithMe />} />
            <Route path="/shared-by-me" element={<SharedByMe />} />
            <Route path="/" element={<Navigate to="/reviews" replace />} />
            <Route path="*" element={<Navigate to="/reviews" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
