import Image from "next/image";
import Link from "next/link";
import { TravelArticle } from "../blog.types";
import { formatDate } from "@/utils/formatter";

const HorizontalBox = ({ data }: { data: TravelArticle }) => {
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
    return (
        <article key={data.documentId} className='flex flex-col md:flex-row gap-4 border rounded-lg p-2 bg-white'>
            <figure className="flex w-full md:w-72 md:min-w-72 md:max-w-72">
                <Link href={`/blog/pasaport/${data.slug}`} className="w-full" itemProp="url">
                    <Image src={baseUrl + data.mainPhoto.url} alt={data.title} width={900} height={500} className="w-full min-w-full rounded-md" itemProp="image" />
                </Link>
            </figure>
            <header className='flex flex-col gap-2 justify-between'>
                <div>
                    <Link href={`/blog/pasaport/${data.slug}`} className="text-lg font-semibold mb-2 text-primary hover:underline" itemProp='url'>{data.title}</Link>
                    <p className="text-gray-600 text-sm" itemProp="description">{data.description}</p>
                </div>
                <div className='flex items-center gap-2 pt-2 md:pt-4 border-t'>
                    <Image src={baseUrl + data.author.photo.url} alt={data.author.name} width={32} height={32} />
                    <div className='text-sm'>
                        <p>{data.author.name}</p>
                        <time dateTime={formatDate(data.createdAt).isoDate}>{formatDate(data.createdAt).formattedDate}</time>
                    </div>
                </div>
            </header>
        </article>
    );
};

export default HorizontalBox;
