"use client";
import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import { Ban } from 'lucide-react'; // Fallback icon

interface DynamicIconProps extends LucideProps {
  name: string; // Accept any string
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  // Check if the icon name is a valid key in dynamicIconImports
  if (name in dynamicIconImports) {
    const LucideIcon = dynamic(dynamicIconImports[name as keyof typeof dynamicIconImports]);
    if (!LucideIcon) {
        return <Ban {...props} aria-label="Invalid icon" />;
    }
    return <LucideIcon {...props} />;
  }
  // If name is not a valid key, render a fallback icon or null
  return <Ban {...props} aria-label={`Invalid icon name: ${name}`} />;
};

export default DynamicIcon;
