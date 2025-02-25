import { NextResponse } from "next/server";
import { cities } from "../data";
import { getRandomIndexes, getRandomType } from "@/utils/generator";

export async function GET() {
    const selectedIndexes = getRandomIndexes(cities.length);
    return NextResponse.json(
        cities.map((city, index) => ({
            ...city,
            type: selectedIndexes.has(index) ? getRandomType() : null,
        }))
    );
}
