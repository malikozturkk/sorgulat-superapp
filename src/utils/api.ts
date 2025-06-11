const base = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "https://sorgulat.com/";
export const getRequest = async <T>(
    url: string,
    baseUrl: string = base
): Promise<T | any> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }
    try {
        const response = await fetch(`${baseUrl}${url}`, {
            method: 'GET',
            headers,
            cache: 'no-cache',
        });

        const res = await response.json()

        if (!response.ok) {
            console.error(`API Error: ${response.status} - ${res.message || 'Unknown error'}`);
            return null;
        }

        return res
    }
    catch (error) {
        console.error("API Request Error:", error);
        return null;
    }
}

export async function getUserLocation(ip: string) {
    try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`);
        const data = await res.json();
        return data.city || data.country || "turkiye";
    } catch {
        return "turkiye";
    }
}