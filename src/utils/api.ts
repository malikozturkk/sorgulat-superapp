const baseUrl = process.env.API_URL || "https://sorgulat.com/";
export const getRequest = async <T>(
    url: string,
): Promise<T | any> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    try {
        const response = await fetch(`${baseUrl}${url}`, {
            method: 'GET',
            headers,
        })

        const res = await response.json()

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${res.message}`)
        }

        return res
    }
    catch (error) {
        console.error("API Request Error:", error);
        return null;
    }
}

// export const postRequest = async <T>(
//   url: string,
//   data?: Record<string, any>,
//   authGuard?: boolean,
//   credentials?: RequestCredentials
// ): Promise<T | any> => {
//   const jwtToken = getJwtToken()
//   const response = await fetch(`${baseURL}${url}`, {
//     method: 'POST',
//     credentials: credentials || 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: authGuard ? `Bearer ${jwtToken}` : '',
//     },
//     body: JSON.stringify(data),
//   })
//   const res = await response.json()
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${res.message}`)
//   }

//   return res?.data
// }
