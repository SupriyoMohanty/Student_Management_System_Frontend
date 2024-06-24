import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '../Components/List';
import InputStudents from '../Components/InputStudents';
import refreshAccessToken from '../Components/refreshToken.js';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshAccessToken();
        // Assuming this function updates the access token

        // Now, you can navigate to the /performance route
        navigate('/home');
      } catch (error) {
        console.error('Error refreshing access token:', error.message);
        // If refresh token is not valid, redirect to login
        navigate('/');
      }
    };

    refresh();
  }, [navigate]); // Include navigate in the dependency array

  return (
    <div>
      <InputStudents />
      <List />
    </div>
  );
};

export default Home;
