import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './domains/home/Home';
import Discover from './domains/discover/Discover/Discover';
import Header from './domains/common/Header/Header';
import Footer from './domains/common/Footer/Footer';
import NotFound from './domains/common/notFound/NotFound';
import Authentication from './domains/authentication/Authentication';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
