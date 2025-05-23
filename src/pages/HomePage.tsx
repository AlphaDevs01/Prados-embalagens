import React from 'react';
import Hero from '../components/home/Hero';
import SobreEmpresa from '../components/home/SobreEmpresa';
import TiposEmbalagem from '../components/home/TiposEmbalagem';
import ProdutosDestaque from '../components/home/ProdutosDestaque';

function HomePage() {
  return (
    <div>
      <Hero />
      <SobreEmpresa />
      <TiposEmbalagem />
      <ProdutosDestaque />
    </div>
  );
}

export default HomePage;