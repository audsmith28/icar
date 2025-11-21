import React from 'react';
import { Search } from 'lucide-react';
import { Input } from './Input';
import clsx from 'clsx';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFilterClick?: () => void;
  filterLabel?: string;
}

export function SearchInput({
  className,
  onFilterClick,
  filterLabel = 'Filter',
  ...props
}: SearchInputProps) {
  return (
    <div className={clsx('flex gap-4 items-center', className)}>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <Input
          className="pl-10"
          {...props}
        />
      </div>
      {onFilterClick && (
        <button
          onClick={onFilterClick}
          className="px-4 py-2 border border-gray-300 rounded-icar-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {filterLabel}
        </button>
      )}
    </div>
  );
}
