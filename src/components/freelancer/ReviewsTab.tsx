
import React from 'react';
import BlurCard from '@/components/ui/blur-card';
import { Freelancer } from '@/data/freelancers';
import { renderStars } from '@/utils/freelancer-utils';

interface ReviewsTabProps {
  freelancer: Freelancer;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ freelancer }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Avis clients</h2>
      
      <div className="space-y-4">
        {freelancer.reviewsList.map((review) => (
          <BlurCard key={review.id} className="p-5">
            <div className="flex items-start gap-4">
              <img 
                src={review.userImage} 
                alt={review.user}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{review.user}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mt-2">{review.comment}</p>
              </div>
            </div>
          </BlurCard>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
