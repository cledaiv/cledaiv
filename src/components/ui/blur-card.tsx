
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  blurStrength?: 'sm' | 'md' | 'lg';
  borderStyle?: 'none' | 'light' | 'medium';
}

const BlurCard = ({
  children,
  className,
  hoverEffect = true,
  blurStrength = 'md',
  borderStyle = 'light',
  ...props
}: BlurCardProps) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  const borderClasses = {
    none: 'border-0',
    light: 'border border-white/10',
    medium: 'border border-white/20',
  };

  return (
    <div
      className={cn(
        'bg-white/10 rounded-xl transition-all duration-300 overflow-hidden',
        blurClasses[blurStrength],
        borderClasses[borderStyle],
        hoverEffect && 'hover:shadow-xl hover:-translate-y-1',
        'animate-scale-in',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlurCard;
