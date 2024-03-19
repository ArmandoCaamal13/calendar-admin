import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <nav className="flex flex-col items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:flex-row sm:justify-between sm:px-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between sm:flex-1">
                <p className="mb-2 text-sm text-gray-700 sm:mb-0">
                    Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-medium">{Math.min((currentPage * itemsPerPage), totalItems)}</span> of{' '}
                    <span className="font-medium">{totalItems}</span> results
                </p>
                <div className="mt-2 sm:mt-0 sm:ml-4">
                    <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {pages.map(page => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`relative inline-flex items-center ${page === currentPage ? 'bg-indigo-600 text-white' : 'text-gray-900'} px-4 py-2 text-sm font-semibold border-t border-b border-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Pagination;
