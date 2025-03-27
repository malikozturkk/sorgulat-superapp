'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LargeBox from '@/components/Blog/ArticleBox/LargeBox';
import { TravelArticle } from '@/components/Blog/blog.types';

type BlogPaginationProps = {
    initialData: { data: TravelArticle[]; meta: { pagination: { page: number; pageCount: number } } };
    currentPage: number;
};

export default function BlogPagination({ initialData, currentPage }: BlogPaginationProps) {
    const [blogs, setBlogs] = useState(initialData.data);
    const [page, setPage] = useState(currentPage);
    const [totalPages, setTotalPages] = useState(initialData.meta.pagination.pageCount);
    const router = useRouter();

    useEffect(() => {
        if (page !== currentPage) {
            const fetchBlogs = async () => {
                const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
                const res = await fetch(`${baseUrl}/api/passport-blogs?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=5`);
                const data = await res.json();
                setBlogs(data.data);
                setTotalPages(data.meta.pagination.pageCount);
            };
            fetchBlogs();
        }
    }, [page, currentPage]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.push(`/blog?page=${newPage}`, { scroll: false });
        window.scrollTo(0, 0);
    };

    return (
        <>
            {blogs.map((passport) => (
                <LargeBox data={passport} key={passport.documentId} />
            ))}
            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        className={`px-4 py-2 border ${page === pageNum ? 'bg-primary text-white' : 'bg-white text-black'}`}
                        onClick={() => handlePageChange(pageNum)}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
        </>
    );
}
