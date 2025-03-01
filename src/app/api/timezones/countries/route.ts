import { NextResponse } from "next/server";
import { countries } from "../data";
import { getRandomIndexes, getRandomType } from "@/utils/generator";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET() {
    const selectedIndexes = getRandomIndexes(countries.length);
    return NextResponse.json(
        countries.map((country, index) => ({
            ...country,
            type: selectedIndexes.has(index) ? getRandomType() : null,
        }))
    );
}
