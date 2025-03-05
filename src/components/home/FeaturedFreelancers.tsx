
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, MessageSquare, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for featured freelancers
const featuredFreelancers = [
  {
    id: 1,
    name: 'Thomas Laurent',
    title: 'Expert IA & Machine Learning',
    rating: 4.9,
    reviews: 127,
    completionRate: 98,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    tags: ['Machine Learning', 'Python', 'TensorFlow'],
    price: 95,
  },
  {
    id: 2,
    name: 'Sophie Dubois',
    title: 'Développeuse Blockchain Senior',
    rating: 4.8,
    reviews: 94,
    completionRate: 97,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    tags: ['Ethereum', 'Smart Contracts', 'Solidity'],
    price: 110,
  },
  {
    id: 3,
    name: 'Alexandre Martin',
    title: 'Consultant Crypto & Finance',
    rating: 4.7,
    reviews: 78,
    completionRate: 95,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    tags: ['DeFi', 'Trading', 'NFT'],
    price: 85,
  },
  {
    id: 4,
    name: 'Elise Bernard',
    title: 'Architecte Solutions PME',
    rating: 4.9,
    reviews: 112,
    completionRate: 99,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    tags: ['CRM', 'ERP', 'Cloud Solutions'],
    price: 90,
  },
];

const FreelancerCard = ({ freelancer, index }: { freelancer: any, index: number }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100 * index); // Staggered animation
    
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-500 hover:shadow-xl border-border/50 h-full",
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-[3/2] bg-muted relative overflow-hidden">
            <div className={cn(
              "absolute inset-0 transition-opacity duration-700",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}>
              <img
                src={freelancer.image}
                alt={freelancer.name}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className={cn(
              "absolute inset-0 bg-muted animate-pulse",
              imageLoaded ? "opacity-0" : "opacity-100"
            )} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-white font-medium">{freelancer.name}</h3>
                <p className="text-white/80 text-sm">{freelancer.title}</p>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-white text-xs font-medium">{freelancer.rating}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {freelancer.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{freelancer.reviews} avis</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{freelancer.completionRate}%</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">À partir de</p>
              <p className="font-semibold">{freelancer.price}€/h</p>
            </div>
          </div>
          
          <Link to={`/freelancers/${freelancer.id}`} className="block">
            <Button variant="outline" className="w-full">
              Voir le profil
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedFreelancers = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Freelances à la une
            </h2>
            <p className="text-muted-foreground">
              Découvrez nos talents les mieux notés, spécialisés dans l'IA, la blockchain 
              et les technologies de pointe.
            </p>
          </div>
          <Link to="/browse" className="group mt-4 md:mt-0">
            <Button variant="link" className="gap-1">
              Voir tous les freelances
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFreelancers.map((freelancer, index) => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFreelancers;
