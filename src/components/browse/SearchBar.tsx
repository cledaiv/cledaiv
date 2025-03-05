
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm, 
  setSearchTerm,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  resetFilters
}) => {
  return (
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
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={resetFilters}
          >
            <X className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
