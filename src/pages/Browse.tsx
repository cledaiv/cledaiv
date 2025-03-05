
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import BlurCard from '@/components/ui/blur-card';
import { freelancersData } from '@/data/freelancers';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const categories = ['IA', 'Blockchain', 'Cryptomonnaie', 'Services PME'];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters Header */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher un freelance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button>
              Rechercher
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Freelancers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancersData.map((freelancer) => (
            <BlurCard key={freelancer.id} className="h-full">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={freelancer.image} 
                    alt={freelancer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                    <p className="text-muted-foreground">{freelancer.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{freelancer.rating}</span>
                      <span className="text-muted-foreground">
                        ({freelancer.reviews} avis)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {freelancer.price}€/h
                  </span>
                  <Link to={`/freelancers/${freelancer.id}`}>
                    <Button variant="outline">
                      Voir le profil
                    </Button>
                  </Link>
                </div>
              </div>
            </BlurCard>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Browse;
