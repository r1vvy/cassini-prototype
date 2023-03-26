import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import Home from './pages/home/Home';

import './App.css';
import NavBar from './components/navbar/NavBar';

function MainLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
