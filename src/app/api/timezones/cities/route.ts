import { NextResponse } from "next/server";
import { cities } from "../data";

export async function GET() {
    return NextResponse.json(cities);
}
