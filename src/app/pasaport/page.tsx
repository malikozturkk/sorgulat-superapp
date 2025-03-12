import PassportMap from '@/components/PassportMap';
import { generateMetadata } from '../layout';

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'pasaport' } });
};

export default async function Passport() {
    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-1 pb-6 md:pb-12 md:gap-2">
            <PassportMap />
        </div>
    )
}