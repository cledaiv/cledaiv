
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSortLabel, type SortOption } from '@/utils/freelancer-utils';

interface ResultsHeaderProps {
  resultCount: number;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  currentPage: number;
  totalPages: number;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  resultCount,
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
  currentPage,
  totalPages
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-xl font-semibold">
        {resultCount} freelance{resultCount !== 1 ? 's' : ''} trouvé{resultCount !== 1 ? 's' : ''}
      </h2>
      
      <div className="flex items-center gap-4">
        {/* Sorting Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <span>{getSortLabel(sortOption)}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortOption('relevant')}>
              Pertinence
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption('price-low')}>
              Prix: croissant
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption('price-high')}>
              Prix: décroissant
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption('rating')}>
              Note
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption('reviews')}>
              Nombre d'avis
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* View Mode Toggles */}
        <div className="flex border rounded-md overflow-hidden">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="sm"
            className="rounded-none"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm"
            className="rounded-none"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        {totalPages > 1 && (
          <div className="text-sm text-muted-foreground hidden md:block">
            Page {currentPage} sur {totalPages}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsHeader;
