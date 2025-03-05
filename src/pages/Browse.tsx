
import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import SearchBar from '@/components/browse/SearchBar';
import FilterPanel from '@/components/browse/FilterPanel';
import ResultsHeader from '@/components/browse/ResultsHeader';
import FreelancerList from '@/components/browse/FreelancerList';
import { useFreelancers } from '@/hooks/use-freelancers';

const Browse = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    selectedSkills,
    filteredFreelancers,
    allSkills,
    categories,
    toggleSkill,
    resetFilters,
    hasActiveFilters,
    sortOption,
    setSortOption,
  } = useFreelancers();

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const freelancersPerPage = viewMode === 'grid' ? 6 : 8;

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredFreelancers.length / freelancersPerPage);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20 flex-grow">
        {/* Search and Filters Header */}
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasActiveFilters={hasActiveFilters}
          resetFilters={resetFilters}
        />

        {/* Advanced Filters */}
        {showFilters && (
          <FilterPanel 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            allSkills={allSkills}
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
          />
        )}

        {/* Results Count and Controls */}
        <ResultsHeader 
          resultCount={filteredFreelancers.length}
          sortOption={sortOption}
          setSortOption={setSortOption}
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        {/* Freelancers List/Grid */}
        <FreelancerList 
          freelancers={filteredFreelancers}
          viewMode={viewMode}
          currentPage={currentPage}
          freelancersPerPage={freelancersPerPage}
          resetFilters={resetFilters}
          paginate={paginate}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
