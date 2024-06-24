import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'; // Import the new Home component
import Login from './Pages/Login';
import Performance from './Pages/Performance';
import HandleUserProfile from './Components/UserProfile';


const App = () => {
  return (
    //BrowserRouter is used to enable the navigation functionality in a React application by providing a way to synchronize the UI with the URL in the browser.
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/performance" element={<Performance />} />
        <Route exact path="/userProfile" element={<HandleUserProfile />} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default App; 
