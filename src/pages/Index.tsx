
import React, { useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Hero from '@/components/home/Hero';
import FeaturedFreelancers from '@/components/home/FeaturedFreelancers';
import Categories from '@/components/home/Categories';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CLEDAIV - Plateforme de Freelancing IA et Blockchain</title>
        <meta name="description" content="Connectez-vous avec des experts en IA, blockchain et cryptomonnaie pour vos projets innovants sur CLEDAIV." />
        <meta name="keywords" content="freelance, IA, intelligence artificielle, blockchain, cryptomonnaie, développement, experts" />
        <link rel="canonical" href="https://cledaiv.com" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedFreelancers />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
