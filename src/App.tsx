import './App.css';
import Header from './components/Header';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
};

export default App;
