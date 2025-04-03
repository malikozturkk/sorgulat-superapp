import { formatDate } from "@/utils/formatter"
import Link from "next/link"
import { TravelArticle, TravelData } from "../blog.types"

const PopularCard = ({ slicedRandom }: TravelData) => {
    return (
        <div className='sticky top-4 md:top-6 space-y-6'>
            <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                <div className="text-lg font-semibold text-gray-900">Öne Çıkan Yazılar</div>
            </div>
            <div className="space-y-4">
                {slicedRandom.map((slicedPassport: TravelArticle, index: number) => (
                    <div className="flex items-start" key={slicedPassport.slug + slicedPassport.id}>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primaryLight text-primary flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    {index + 1}
                    </span>
                    <div>
                    <div className="text-sm font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/blog/pasaport/${slicedPassport.slug}`}>
                        {slicedPassport.title}
                        </Link>
                    </div>
                    <time dateTime={formatDate(slicedPassport.createdAt).isoDate} itemProp="datePublished" className="text-xs text-gray-500 block mt-1"> {formatDate(slicedPassport.createdAt).formattedDate} </time>
                    </div>
                </div>
                ))}
            </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Kategoriler
                </div>
                <ul className="space-y-2">
                <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <a href="/blog/pasaport" className="text-gray-700 hover:text-primary transition-colors">
                        Pasaport
                    </a>
                </li>
                </ul>
            </div>
        </div>
    )
}

export default PopularCard