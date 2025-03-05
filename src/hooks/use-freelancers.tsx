
import { useState, useEffect } from 'react';
import { freelancersData, Freelancer } from '@/data/freelancers';
import { sortFreelancers, type SortOption } from '@/utils/freelancer-utils';

export const useFreelancers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('relevant');
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>(freelancersData);

  // Get all unique skills from freelancers
  const allSkills = Array.from(
    new Set(
      freelancersData.flatMap(freelancer => freelancer.skills)
    )
  ).sort();

  // Categories for filtering
  const categories = ['IA', 'Blockchain', 'Cryptomonnaie', 'Services PME'];

  // Handle skill selection toggle
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 200]);
    setMinRating(0);
    setSelectedSkills([]);
    setSearchTerm('');
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategory !== null || 
                          priceRange[0] > 0 || 
                          priceRange[1] < 200 || 
                          minRating > 0 || 
                          selectedSkills.length > 0 ||
                          searchTerm !== '';

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

    // Apply sorting
    filtered = sortFreelancers(filtered, sortOption);

    setFilteredFreelancers(filtered);
  }, [searchTerm, selectedCategory, priceRange, minRating, selectedSkills, sortOption]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    selectedSkills,
    setSelectedSkills,
    sortOption,
    setSortOption,
    filteredFreelancers,
    allSkills,
    categories,
    toggleSkill,
    resetFilters,
    hasActiveFilters,
  };
};
