import { NextResponse } from "next/server";
import { countries } from "../data";
import { getRandomIndexes } from "@/utils/generator";

export async function GET() {
    const selectedIndexes = getRandomIndexes(countries.length);
    return NextResponse.json(
        countries.map((country, index) => ({
            ...country,
            selected: selectedIndexes.has(index),
        }))
    );
}
