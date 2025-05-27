// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import TrendingContent from './components/TrendingContent';
import RecommendationEngine from './components/RecommendationEngine';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <div className="content-wrapper">
        <Header />
        <main>
          <Hero />
          <Features />
          <TrendingContent />
          <RecommendationEngine />
          <Pricing />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
