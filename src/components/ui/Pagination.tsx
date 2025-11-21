import React from 'react';
import { ICARButton } from './ICARButton';
import clsx from 'clsx';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
  className,
}: PaginationProps) {
  const startItem = totalItems ? (currentPage - 1) * (pageSize || 10) + 1 : undefined;
  const endItem = totalItems
    ? Math.min(currentPage * (pageSize || 10), totalItems)
    : undefined;

  return (
    <div className={clsx('flex justify-between items-center', className)}>
      {totalItems && (
        <p className="text-sm text-gray-600">
          Showing {startItem}-{endItem} of {totalItems} items
        </p>
      )}
      <div className="flex gap-2">
        <ICARButton
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </ICARButton>
        <ICARButton
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </ICARButton>
      </div>
    </div>
  );
}
