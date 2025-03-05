
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

// Pagination helper functions
export const paginateArray = <T,>(array: T[], itemsPerPage: number, currentPage: number): T[] => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return array.slice(indexOfFirstItem, indexOfLastItem);
};

export const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const getVisiblePageNumbers = (currentPage: number, totalPages: number, maxPagesShown = 7): number[] => {
  // If we have fewer pages than the max, show all
  if (totalPages <= maxPagesShown) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  // Always show first and last page
  let visiblePages: number[] = [1, totalPages];
  
  // Get pages around current page
  const surrounding = Math.floor((maxPagesShown - 2) / 2);
  
  let startPage = Math.max(2, currentPage - surrounding);
  let endPage = Math.min(totalPages - 1, currentPage + surrounding);
  
  // Adjust if we're close to the beginning or end
  if (startPage <= 2) {
    endPage = Math.min(totalPages - 1, maxPagesShown - 1);
  }
  
  if (endPage >= totalPages - 1) {
    startPage = Math.max(2, totalPages - maxPagesShown + 2);
  }
  
  // Add the range of pages in the middle
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }
  
  // Sort and remove duplicates
  return [...new Set(visiblePages)].sort((a, b) => a - b);
};
