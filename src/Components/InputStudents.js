// InputStudents.js this file contains the title of web page and add new student button
import React, { Fragment, useState, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Add from "./AddStudents.js";
import ResponsiveAppBar from "./AppBar.js";

import config from "../config.js";


const InputStudents = () => {
  const [isAddOpen, setAddOpen] = useState(false);


  const handleAddClick = () => {
    setAddOpen(true);
  };


  const handleAddClose = () => {
    setAddOpen(false);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //     const windowHeight = window.innerHeight;
  //     const documentHeight = document.documentElement.scrollHeight;

  //     // Adjust the threshold value as needed
  //     const threshold = 100;

  //     // Check if we're close to the bottom of the page
  //     if (documentHeight - (scrollTop + windowHeight) < threshold) {
  //       setFooterFixed(true);
  //     } else {
  //       setFooterFixed(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const [isFooterFixed, setFooterFixed] = useState(false);

  const handleAddSubmit = async (formData) => {

    // Include the timestamp in formData
    formData.timestamp = new Date().toISOString(); //This is used for recording timestamps for data entries for sortind data in this case , as the ISO 8601 format is a standardized way of representing dates and times.

    // Make a fetch request or call a function to add data to PostgreSQL


    try {
      const response = await fetch(`${config.apiBaseUrl}/studentsData/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      });

      if (response.ok) {
        console.log("Student added successfully");
    
        window.location = "/home";
        handleAddClose();

      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };



  return (
    <Fragment>
    <ResponsiveAppBar />
      <div
        style={{
          backgroundImage: "url('./images/bkg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1, //used to keep it in back in comparison to zIndex:'1'
          opacity: "0.8",
        }}
      ></div>
      <Card style={{
          maxWidth: 650,
          margin: "0 auto",
          marginTop: "20px", // Adjust the value of marginTop as needed
          marginBottom:"20px",
          boxShadow: "none",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}>
      <Typography
        gutterBottom
        variant="h3"
        fontFamily={"fantasy"}
        align="center"
        style={{ zIndex: 1 }} // Set a higher value for the content
      >
        Students Management System
      </Typography>
      </Card>
      
      <Card
        style={{
          maxWidth: 450,
          margin: "0 auto",
          boxShadow: "none",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <CardContent>
          <Button
            variant="contained"
            color="warning"
            onClick={handleAddClick}
            fullWidth
            style={{fontWeight:'bold'}}
          >
            Add New Student
          </Button>
          
          

          {/* Render the Add component when adding is triggered.....following <Add/> open onClose onSubmit parameters are passed to add.js*/}

          <Add
            open={isAddOpen}
            onClose={handleAddClose}
            onSubmit={handleAddSubmit}
          />
        </CardContent>
        
      </Card>
      {/* <div style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <Typography align="center" variant="body2" color="textSecondary">
          Your footer content goes here
        </Typography>
      </div> */}
      {/* <div
        style={{
          position: isFooterFixed ? "fixed" : "static",
          bottom: 0,
          width: "100%",
          //backgroundColor: "rgba(255, 255, 255, 0.8)",
          display: isFooterFixed ? "block" : "none",
          background: 'linear-gradient(to right, rgba(209, 94, 30, 0.8), rgba(20, 58, 138, 0.8)', boxShadow: 'none' 
        }}
      >
        <Typography align="center"
        variant="body2"
        color="white"
        fontFamily="cursive" // Set the font family to cursive
        fontSize="16px" // Set the font size as needed
        style={{ lineHeight: '30px', margin: '0' }} // Centering the text vertically
        >
          @ Supriyo Mohanty
        </Typography>
      </div> */}
    </Fragment>
  );
};

export default InputStudents;
