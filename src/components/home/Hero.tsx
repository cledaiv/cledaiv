
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BlurCard from '@/components/ui/blur-card';
import { ArrowRight, Star, Shield, Clock, Award } from 'lucide-react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/70 to-transparent -z-10" />
      
      {/* Background blurred shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-10" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000 -z-10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className={`space-y-8 ${loaded ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="space-y-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
                <span className="text-xs font-medium text-indigo-600">La plateforme des freelances tech</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Connectez-vous aux{' '}
                <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                  meilleurs talents
                </span>{' '}
                en IA et blockchain
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mt-4">
                Trouvez des freelances spécialisés dans l'intelligence artificielle, 
                la blockchain et les cryptomonnaies pour faire avancer vos projets innovants.
              </p>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/browse">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white">
                  Explorer les talents
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth?type=signup">
                <Button size="lg" variant="outline">
                  Devenir freelance
                </Button>
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-500" />
                <span className="text-sm text-muted-foreground">Paiements sécurisés</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-indigo-500" />
                <span className="text-sm text-muted-foreground">Talents vérifiés</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-500" />
                <span className="text-sm text-muted-foreground">Livraison à temps</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-500" />
                <span className="text-sm text-muted-foreground">Satisfaction garantie</span>
              </div>
            </div>
          </div>
          
          {/* Hero visual/illustration */}
          <div className={`relative ${loaded ? 'animate-slide-up animation-delay-300' : 'opacity-0'}`}>
            <BlurCard className="p-6 w-full max-w-lg mx-auto">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-500/90 to-cyan-400/90 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Freelance collaboration"
                  className="w-full h-full object-cover rounded-lg mix-blend-overlay opacity-80"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 animate-float">
                <div className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">AI</div>
                <div>
                  <p className="font-medium">Intelligence Artificielle</p>
                  <p className="text-sm text-muted-foreground">+250 experts</p>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 animate-float delay-300">
                <div className="bg-cyan-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">BC</div>
                <div>
                  <p className="font-medium">Blockchain</p>
                  <p className="text-sm text-muted-foreground">+180 experts</p>
                </div>
              </div>
            </BlurCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
