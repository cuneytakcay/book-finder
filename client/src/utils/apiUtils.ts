// Get the base URL for API calls based on the environment (development vs. production)
const getApiBaseUrl = (): string => {
  if (import.meta.env.MODE === 'production') {
    // In production, use the full backend URL
    return 'https://book-finder-xu3a.onrender.com/api';
  } else {
    // In development, use a relative URL, and Vite's proxy will handle it
    return '/api';
  }
};

export const apiBaseUrl = getApiBaseUrl();
