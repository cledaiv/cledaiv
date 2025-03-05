
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import BlurCard from '@/components/ui/blur-card';
import { renderStars } from '@/utils/freelancer-utils';

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  allSkills: string[];
  selectedSkills: string[];
  toggleSkill: (skill: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  allSkills,
  selectedSkills,
  toggleSkill
}) => {
  return (
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
  );
};

export default FilterPanel;
