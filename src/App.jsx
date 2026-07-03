import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Import all page components
import Homepage from './Pages/Homepage/Homepage';
import Auctionpage from './Pages/Auctionpage/Auctionpage';
import Contactpage from './Pages/Contactpage/Contactpage';
import Donarpage from './Pages/Donarpage/Donarpage';
import Gallerypage from './Pages/Gallerypage/Gallerypage';
import Prizespage from './Pages/Prizespage/Prizespage';
import Timelinepage from './Pages/Timelinepage/Timelinepage';

// Import components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/"          element={<Homepage />} />
          <Route path="/auction"   element={<Auctionpage />} />
          <Route path="/contact"   element={<Contactpage />} />
          <Route path="/donar"     element={<Donarpage />} />
          <Route path="/gallery"   element={<Gallerypage />} />
          <Route path="/prizes"    element={<Prizespage />} />
          <Route path="/timeline"  element={<Timelinepage />} />
        </Routes>
      </main>
      {/* Hide footer on homepage – it's a fullscreen experience */}
      {!isHome && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;