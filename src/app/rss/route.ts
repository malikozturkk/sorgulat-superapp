import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date().toLocaleTimeString("tr-TR", { timeZone: "Europe/Istanbul" });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Sorgulat | Saat Kaç</title>
      <link>https://sorgulat.com/saat-kac</link>
      <description>Sorgulat.com saat kaç</description>
      <item>
        <title>İstanbul'da Saat Kaç?</title>
        <link>https://sorgulat.com/saat-kac/istanbul</link>
        <description>İstanbul'da şu an saat: ${now}</description>
        <pubDate>${new Date().toUTCString()}</pubDate>
      </item>
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}
