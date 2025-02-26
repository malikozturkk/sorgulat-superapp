import { NextResponse } from "next/server";

export async function GET() {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Sorgulat Saat Kaç</title>
      <link>https://sorgulat.com/saat-kac</link>
      <description>Sorgulat.com saat kaç</description>
      <item>
        <title>İstanbul Saat Kaç</title>
        <link>https://sorgulat.com/saat-kac/istanbul</link>
        <description>İstanbulda saat kaç</description>
      </item>
    </channel>
  </rss>`;

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/rss+xml" },
    });
}
