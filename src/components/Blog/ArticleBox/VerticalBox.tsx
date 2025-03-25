import Image from "next/image";
import Link from "next/link";
import { TravelArticle } from "../blog.types";
import { formatDate } from "@/utils/formatter";

const ArticleBox = ({ data }: { data: TravelArticle }) => {
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
    return (
        <Link className='border rounded-lg p-2 bg-white flex justify-between gap-4 flex-col' href={`/blog/pasaport/${data.slug}`}>
            <div>
                <Image className='mb-2' src={baseUrl + data.mainPhoto.url} alt={data.title} width={900} height={500} itemProp='image' />
                <h3 className='text-base font-semibold mb-2 text-primary hover:underline' itemProp='name'>{data.title}</h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm' itemProp='description'>{data.description}</p>
            </div>
            <div className='flex items-center gap-2 pt-2 md:pt-4 border-t'>
                <Image src={baseUrl + data.author.photo.url} alt={data.author.name} width={32} height={32} />
                <div className='text-sm'>
                    <p>{data.author.name}</p>
                    <time className='text-sm' dateTime={formatDate(data.createdAt).isoDate}>{formatDate(data.createdAt).formattedDate}</time>
                </div>
            </div>
        </Link>
    );
};

export default ArticleBox;
