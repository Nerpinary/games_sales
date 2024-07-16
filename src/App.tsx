import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import NintendoSale from './pages/NintendoSale';
import NintendoAll from './pages/NintendoAll';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<NintendoSale />} path='/nintendo_sale' />
        <Route element={<NintendoAll />} path='/nintendo_all' />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
