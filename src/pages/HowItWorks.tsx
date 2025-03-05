
import React, { useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import HowItWorks from '@/components/home/HowItWorks';

const HowItWorksPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
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
