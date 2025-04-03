'use client';

import { SortTypes } from '@/app/blog/page';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const sortOptions: { label: string; value: SortTypes }[] = [
    { label: 'Eklenme Tarihi (Yeniden Eskiye)', value: 'createdAt:desc' },
    { label: 'Eklenme Tarihi (Eskiden Yeniye)', value: 'createdAt:asc' },
    { label: 'Alfabetik (A-Z)', value: 'title:asc' },
    { label: 'Alfabetik (Z-A)', value: 'title:desc' }
];

interface IFilterSortControls {
    currentSort: SortTypes
}

const FilterSortControls: React.FC<IFilterSortControls> = ({ currentSort }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [sort, setSort] = useState<SortTypes>(currentSort);

    const updateQueryParams = (newSort: any) => {
        const params = new URLSearchParams(searchParams);
        if (newSort) params.set('sort', newSort);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 p-4 bg-gray-100 rounded-lg">
            <select
                className="p-3 pr-4 text-sm border rounded-lg w-full bg-no-repeat bg-[length:7px_7px] appearance-none bg-[position:calc(100%_-_8px)]  bg-[url('https://www.svgrepo.com/show/80156/down-arrow.svg')] truncate md:bg-no-repeat bg-[length:14px_14px] md:text-base md:p-4 md:pr-8 md:bg-[position:calc(100%_-_16px)] md:w-5/12"
                value={sort}
                onChange={(e) => {
                    const newSort = e.target.value as SortTypes; 
                    setSort(newSort);
                    updateQueryParams(newSort);
                }}
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default FilterSortControls