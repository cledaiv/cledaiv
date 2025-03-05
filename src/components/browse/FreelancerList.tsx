
import React from 'react';
import { Button } from '@/components/ui/button';
import FreelancerCard from './FreelancerCard';
import PaginationControls from './PaginationControls';
import { Freelancer } from '@/data/freelancers';

interface FreelancerListProps {
  freelancers: Freelancer[];
  viewMode: 'grid' | 'list';
  currentPage: number;
  freelancersPerPage: number;
  resetFilters: () => void;
  paginate: (pageNumber: number) => void;
}

const FreelancerList: React.FC<FreelancerListProps> = ({
  freelancers,
  viewMode,
  currentPage,
  freelancersPerPage,
  resetFilters,
  paginate
}) => {
  // Get current freelancers to display based on pagination
  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = freelancers.slice(indexOfFirstFreelancer, indexOfLastFreelancer);
  
  // Calculate total pages
  const totalPages = Math.ceil(freelancers.length / freelancersPerPage);

  if (freelancers.length === 0) {
    return (
      <div className="text-center p-12">
        <p className="text-lg text-muted-foreground">Aucun freelance ne correspond à vos critères de recherche.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={resetFilters}
        >
          Réinitialiser les filtres
        </Button>
      </div>
    );
  }

  return (
    <>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentFreelancers.map((freelancer) => (
            <FreelancerCard 
              key={freelancer.id} 
              freelancer={freelancer} 
              viewMode={viewMode} 
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentFreelancers.map((freelancer) => (
            <FreelancerCard 
              key={freelancer.id} 
              freelancer={freelancer} 
              viewMode={viewMode} 
            />
          ))}
        </div>
      )}

      <PaginationControls 
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </>
  );
};

export default FreelancerList;
