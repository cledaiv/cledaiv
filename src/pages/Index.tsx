
import React, { useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Hero from '@/components/home/Hero';
import FeaturedFreelancers from '@/components/home/FeaturedFreelancers';
import Categories from '@/components/home/Categories';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
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
