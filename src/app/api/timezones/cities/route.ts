import { NextResponse } from "next/server";
import { cities } from "../data";
import { getRandomIndexes } from "@/utils/generator";

export async function GET() {
    const selectedIndexes = getRandomIndexes(cities.length);
    return NextResponse.json(
        cities.map((city, index) => ({
            ...city,
            selected: selectedIndexes.has(index),
        }))
    );
}
