import React from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  // Choose logo based on theme - Using proper alias
  const logoSrc = theme === 'dark' ? '/attached_assets/Blacklogo.png' : '/attached_assets/whitelogo.png';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} flex items-center justify-center rounded-md bg-primary text-primary-foreground overflow-hidden`}>
        <img 
          src={logoSrc} 
          alt="Expense Manager Logo"
          className="h-100 w-100 object-contain"
          onError={(e) => {
            console.log('Logo failed to load:', logoSrc);
            // Fallback to text if image not found
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = '<span class="font-mono text-sm font-bold">EM</span>';
            }
          }}
          onLoad={() => {
            console.log('Logo loaded successfully:', logoSrc);
          }}
        />
      </div>
      
      {/* Logo Text */}
      {showText && (
        <span className={`font-bold text-foreground ${textSizeClasses[size]}`}>
          Expense Manager
        </span>
      )}
    </div>
  );
}

export default Logo;
