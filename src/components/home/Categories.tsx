
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import BlurCard from '@/components/ui/blur-card';
import { Brain, Database, BarChart3, Users } from 'lucide-react';

const categories = [
  {
    id: 'ai',
    name: 'Intelligence Artificielle',
    description: 'Experts en machine learning, deep learning, NLP et vision par ordinateur',
    icon: Brain,
    color: 'from-indigo-500 to-purple-600',
    services: ['Chatbots', 'Systèmes de recommandation', 'Traitement d\'images', 'Analyse prédictive'],
    count: 250,
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    description: 'Développeurs spécialisés dans les technologies blockchain et smart contracts',
    icon: Database,
    color: 'from-blue-500 to-cyan-400',
    services: ['Smart Contracts', 'dApps', 'Intégration Web3', 'NFTs'],
    count: 180,
  },
  {
    id: 'crypto',
    name: 'Cryptomonnaie',
    description: 'Consultants et développeurs pour vos projets de cryptomonnaie et DeFi',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-400',
    services: ['DeFi', 'Tokenomics', 'Exchange', 'Wallets'],
    count: 145,
  },
  {
    id: 'sme',
    name: 'Services PME',
    description: 'Solutions technologiques sur mesure pour les petites et moyennes entreprises',
    icon: Users,
    color: 'from-orange-500 to-amber-400',
    services: ['CRM/ERP', 'Automatisation', 'Sites web', 'Applications métier'],
    count: 210,
  },
];

const CategoryCard = ({ category, index }: { category: any, index: number }) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 150 * index); // Staggered animation
    
    return () => clearTimeout(timer);
  }, [index]);

  const IconComponent = category.icon;

  return (
    <Link to={`/browse?category=${category.id}`}>
      <BlurCard 
        className={cn(
          "h-full",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="p-6 space-y-4 h-full flex flex-col">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.color}`}>
            <IconComponent className="h-7 w-7 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <p className="text-muted-foreground mt-2">{category.description}</p>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {category.services.map((service: string) => (
                <span 
                  key={service}
                  className="inline-block text-xs bg-muted rounded-full px-3 py-1"
                >
                  {service}
                </span>
              ))}
            </div>
            
            <div className="text-sm font-medium">
              <span className="text-primary">{category.count}+ experts disponibles</span>
            </div>
          </div>
        </div>
      </BlurCard>
    </Link>
  );
};

const Categories = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explorez nos catégories de services
          </h2>
          <p className="text-muted-foreground">
            Des freelances spécialisés pour répondre à tous vos besoins dans les domaines 
            de pointe de la technologie et de l'innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
