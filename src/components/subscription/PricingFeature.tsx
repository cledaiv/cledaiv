
import React from 'react';
import { Check } from 'lucide-react';

interface PricingFeatureProps {
  children: React.ReactNode;
}

const PricingFeature: React.FC<PricingFeatureProps> = ({ children }) => {
  return (
    <div className="flex items-center">
      <Check className="h-4 w-4 mr-2 text-primary" />
      <span className="text-sm">{children}</span>
    </div>
  );
};

export default PricingFeature;
