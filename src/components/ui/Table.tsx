import React from 'react';
import clsx from 'clsx';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <table
                    ref={ref}
                    className={clsx(
                        'w-full border-collapse',
                        className
                    )}
                    {...props}
                >
                    {children}
                </table>
            </div>
        );
    }
);

Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={clsx(
            'bg-gray-50 border-b border-gray-200 sticky top-0 z-10',
            className
        )}
        {...props}
    />
));

TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={clsx('divide-y divide-gray-200', className)}
        {...props}
    />
));

TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement> & {
        hover?: boolean;
    }
>(({ className, hover = true, ...props }, ref) => (
    <tr
        ref={ref}
        className={clsx(
            'transition-colors duration-150',
            hover && 'hover:bg-sea-green-off-white cursor-pointer',
            className
        )}
        {...props}
    />
));

TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={clsx(
            'px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider',
            className
        )}
        {...props}
    />
));

TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={clsx(
            'px-6 py-4 text-sm text-gray-900 whitespace-nowrap',
            className
        )}
        {...props}
    />
));

TableCell.displayName = 'TableCell';

