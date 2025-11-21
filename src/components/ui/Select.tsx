import React from 'react';
import clsx from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helpText?: string;
    success?: boolean;
    options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, helpText, success, options, ...props }, ref) => {
        const hasError = !!error;
        const hasSuccess = success && !hasError;
        
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        className={clsx(
                            'w-full px-4 py-2.5 rounded-lg border transition-all duration-200 appearance-none',
                            'focus:outline-none focus:ring-2 focus:ring-offset-1',
                            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                            'bg-white cursor-pointer',
                            hasError && [
                                'border-red-500 focus:border-red-500 focus:ring-red-500',
                                'bg-red-50'
                            ],
                            hasSuccess && [
                                'border-green-500 focus:border-green-500 focus:ring-green-500',
                                'bg-green-50'
                            ],
                            !hasError && !hasSuccess && [
                                'border-gray-300 focus:border-sea-green-darker focus:ring-sea-green-darker',
                                'hover:border-gray-400'
                            ],
                            className
                        )}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {error && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
                {helpText && !error && (
                    <p className="mt-1.5 text-xs text-gray-500">
                        {helpText}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

