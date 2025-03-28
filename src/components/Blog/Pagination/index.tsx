'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const changePage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(page));
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex mt-6 gap-2 w-full justify-between md:justify-center">
            <button
                className={`px-4 py-2 border rounded bg-primary text-white w-1/3 md:w-auto ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Önceki
            </button>
            <span className="px-4 py-2 border rounded text-center w-1/3 md:w-auto">{currentPage} / {totalPages}</span>
            <button
                className={`px-4 py-2 border rounded bg-primary text-white w-1/3 md:w-auto ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Sonraki
            </button>
        </div>
    );
}
