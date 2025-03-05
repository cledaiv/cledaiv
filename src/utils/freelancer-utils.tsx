
import React from 'react';
import { Star } from 'lucide-react';
import { freelancersData } from '@/data/freelancers';

export const getFreelancerById = (id: string | undefined) => {
  if (!id) return null;
  return freelancersData.find(f => f.id === Number(id)) || null;
};

export const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star 
      key={i} 
      className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
    />
  ));
};
