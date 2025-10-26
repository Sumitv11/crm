// export const BASE_URL = "http://localhost:8081";

// export const fetchData = async (endpoint: string, options: RequestInit = {}) => {
//   const token = localStorage.getItem("token");
// // console.log('in api');
//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...options.headers,
//   };

//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       ...options,
//       headers,
//       cache: "no-cache", // Use "no-cache" for fresh data fetching in Vite
//     });

//     if (!response.ok) {
//       const errorResponse = await response.json();
//       const message = errorResponse.message || response.statusText || "Something went wrong";
//       throw new Error(message);
//     }
//     // console.log('in service',response);

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };


export const BASE_URL = "http://20.219.1.165:8096";

export const fetchData = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      cache: "no-cache", // Use "no-cache" for fresh data fetching in Vite
    });

    if (!response.ok) {
      // console.log(await response.json())
      // Attempt to parse JSON error response, fallback to status text if unavailable
      let errorMessage = "Something went wrong";
      try {
        const errorResponse = await response.json();
        errorMessage = errorResponse.message || errorMessage;
        // console.log(errorMessage)
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Attempt to parse response as JSON
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
