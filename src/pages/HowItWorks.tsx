
import React, { useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import HowItWorks from '@/components/home/HowItWorks';
import { Helmet } from 'react-helmet-async';

const HowItWorksPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Comment ça marche | CLEDAIV</title>
        <meta name="description" content="Découvrez comment fonctionne CLEDAIV et comment trouver les meilleurs experts en IA et blockchain pour vos projets." />
        <meta name="keywords" content="freelance, processus, étapes, embaucher, experts, IA, blockchain" />
        <link rel="canonical" href="https://cledaiv.com/how-it-works" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow mt-20">
        <div className="py-8 container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">Comment ça marche</h1>
          <p className="text-muted-foreground text-center mb-12">Découvrez notre processus simple en quelques étapes</p>
        </div>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
