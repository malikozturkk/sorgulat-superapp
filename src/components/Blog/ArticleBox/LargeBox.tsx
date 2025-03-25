import Image from "next/image";
import Link from "next/link";
import { TravelArticle } from "../blog.types";
import { formatDate } from "@/utils/formatter";

interface ILargeBox {
    data: TravelArticle
}

const LargeBox: React.FC<ILargeBox> = ({ data }) => {
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
    return (
        <article className='bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-md' key={data.slug + data.id}>
            <Link href={`/blog/pasaport/${data.slug}`}>
                <figure>
                    <Image src={baseUrl + data.mainPhoto.url} alt={data.title} width={900} height={500} className='rounded-lg transition-transform duration-300 hover:scale-105' itemProp='image' />
                </figure>
            </Link>
            <div className='p-4 flex flex-col flex-grow'>
                <div className='flex items-center text-xs text-gray-500 mb-2'>
                    <time dateTime={formatDate(data.createdAt).isoDate} itemProp="datePublished" className='min-w-fit'> {formatDate(data.createdAt).formattedDate} </time>
                    <span className="mx-2">•</span>
                    <div className="truncate max-w-full">
                        <span className="text-primary">
                            Pasaport
                        </span>
                    </div>
                </div>
                <Link href={`/blog/pasaport/${data.slug}`} itemProp='url'>
                    <title className='text-lg font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary' itemProp='headline'>{data.title}</title>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow" itemProp="description">{data.description}</p>
                    <div className="text-primary text-sm font-medium hover:opacity-80 inline-flex items-center mt-auto">
                        <span>Devamını oku</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </Link>
            </div>
        </article>
    );
};

export default LargeBox;
