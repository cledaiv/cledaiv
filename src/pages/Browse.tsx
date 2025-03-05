
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  SlidersHorizontal, 
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import BlurCard from '@/components/ui/blur-card';
import { freelancersData } from '@/data/freelancers';
import { renderStars } from '@/utils/freelancer-utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancersData);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const freelancersPerPage = 6;

  const categories = ['IA', 'Blockchain', 'Cryptomonnaie', 'Services PME'];
  
  // Get all unique skills from freelancers
  const allSkills = Array.from(
    new Set(
      freelancersData.flatMap(freelancer => freelancer.skills)
    )
  ).sort();

  // Handle skill selection toggle
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = freelancersData;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(freelancer => 
        freelancer.name.toLowerCase().includes(searchLower) || 
        freelancer.title.toLowerCase().includes(searchLower) ||
        freelancer.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(freelancer => 
        freelancer.skills.some(skill => skill.includes(selectedCategory))
      );
    }

    // Filter by price range
    filtered = filtered.filter(freelancer => 
      freelancer.price >= priceRange[0] && freelancer.price <= priceRange[1]
    );

    // Filter by minimum rating
    if (minRating > 0) {
      filtered = filtered.filter(freelancer => freelancer.rating >= minRating);
    }

    // Filter by selected skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(freelancer =>
        selectedSkills.every(skill => freelancer.skills.includes(skill))
      );
    }

    setFilteredFreelancers(filtered);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, minRating, selectedSkills]);

  // Get current freelancers to display based on pagination
  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = filteredFreelancers.slice(indexOfFirstFreelancer, indexOfLastFreelancer);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredFreelancers.length / freelancersPerPage);

  // Generate array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
            <Button 
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? "Masquer les filtres" : "Filtres"}
            </Button>
            {(selectedCategory || priceRange[0] > 0 || priceRange[1] < 200 || minRating > 0 || selectedSkills.length > 0) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory(null);
                  setPriceRange([0, 200]);
                  setMinRating(0);
                  setSelectedSkills([]);
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <BlurCard className="mb-8 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categories Filter */}
              <div>
                <h3 className="font-medium mb-3">Catégories</h3>
                <div className="flex flex-wrap gap-2">
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
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-3">Tarif horaire</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={200}
                    step={5}
                    onValueChange={(value: [number, number]) => setPriceRange(value)}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span>{priceRange[0]}€/h</span>
                    <span>{priceRange[1]}€/h</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-medium mb-3">Note minimale</h3>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                        className={`cursor-pointer ${rating <= minRating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        {renderStars(rating)[0]}
                      </button>
                    ))}
                  </div>
                  {minRating > 0 && (
                    <span className="text-sm">
                      {minRating}+ étoiles
                    </span>
                  )}
                </div>
              </div>

              {/* Skills Filter */}
              <div className="lg:col-span-3">
                <h3 className="font-medium mb-3">Compétences</h3>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </BlurCard>
        )}

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {filteredFreelancers.length} freelance{filteredFreelancers.length !== 1 ? 's' : ''} trouvé{filteredFreelancers.length !== 1 ? 's' : ''}
          </h2>
          {totalPages > 1 && (
            <div className="text-sm text-muted-foreground">
              Page {currentPage} sur {totalPages}
            </div>
          )}
        </div>

        {/* Freelancers Grid */}
        {currentFreelancers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentFreelancers.map((freelancer) => (
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
                          <div className="flex">{renderStars(freelancer.rating)}</div>
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
                        {freelancer.skills.length > 3 && (
                          <Badge variant="outline">
                            +{freelancer.skills.length - 3}
                          </Badge>
                        )}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={goToPreviousPage} 
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {/* First page */}
                    {currentPage > 3 && (
                      <PaginationItem>
                        <PaginationLink onClick={() => paginate(1)}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    {/* Ellipsis */}
                    {currentPage > 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    
                    {/* Pages */}
                    {pageNumbers
                      .filter(number => {
                        if (totalPages <= 7) return true;
                        return Math.abs(number - currentPage) < 3 || number === 1 || number === totalPages;
                      })
                      .map(number => {
                        // Skip if we already added first or last page
                        if ((number === 1 && currentPage > 3) || (number === totalPages && currentPage < totalPages - 2)) {
                          return null;
                        }
                        
                        return (
                          <PaginationItem key={number}>
                            <PaginationLink 
                              isActive={currentPage === number} 
                              onClick={() => paginate(number)}
                            >
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                    
                    {/* Ellipsis */}
                    {currentPage < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    
                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationLink onClick={() => paginate(totalPages)}>
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={goToNextPage} 
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-12">
            <p className="text-lg text-muted-foreground">Aucun freelance ne correspond à vos critères de recherche.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setPriceRange([0, 200]);
                setMinRating(0);
                setSelectedSkills([]);
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
