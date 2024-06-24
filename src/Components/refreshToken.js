import config from "../config.js";

const refreshAccessToken = async () => {
    console.log('TEst');
    try {
        console.log('TEst2');
        const response = await fetch(`${config.apiBaseUrl}/studentsData/refreshtoken`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
         
      });
      console.log('TEst3');
  
      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }
  
      const data = await response.json();
      // Handle the refreshed access token and new refresh token
      const { accessToken, refreshToken } = data.data;
      console.log('Access token refreshed:', accessToken);
  
      // Optionally, you can set the refreshed access token in your application state or perform other actions
    } catch (error) {
      console.error('Error during access token refresh:', error.message);
      // Handle errors as needed
    }
  };
  
  // Call the refreshAccessToken function when needed
  // Example: Call it when the current access token is about to expire
  // or when a protected route is accessed
//   refreshAccessToken();
export default refreshAccessToken;
  