// Import necessary components and hooks
import React, { Fragment, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


import HandleEdit from "./EditStudents";
import config from "../config";

// Define styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //this is for styling head
    backgroundColor: "#7BC9EB ", //bg color of head
    color: theme.palette.common.black, //font style of head
  },
  [`&.${tableCellClasses.body}`]: {
    //styling for body
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    //removing border for last row
    border: 0,
  },
}));

// Define the List component
const List = () => {
  const [students, setStudents] = useState([]); //used to save the data fetched from  the sever initially empty array
  const [editDialogOpen, setEditDialogOpen] = useState(false); //initially edit dialog box set to close
  const [selectedStudent, setSelectedStudent] = useState(null); // no
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); //initially delete dialog box is close
  const [deleteTarget, setDeleteTarget] = useState(null); // no target to delete initially
  const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order...initially to desc

  // Function to fetch students from the server
  const fetchStudents = async () => {
    try {

      const response = await fetch(`${config.apiBaseUrl}/studentsData/`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        // console.log(data);
      } else {
        console.error("Server error:", response.status, response.statusText);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };
  //component is initially rendered and added to the DOM, the useEffect is called after the first render. This is equivalent to the lifecycle method componentDidMount in class components.

  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to sort students based on roll number
  const sortStudents = () => {
    const sortedStudents = [...students].sort((a, b) => {
      // sortedStudents used to create a shallow copy using spread operator ...students
      // so as to avoid directly modifying the state array

      // Convert roll numbers to numbers for numerical comparison
      const rollNumberA = parseInt(a.roll_no);
      const rollNumberB = parseInt(b.roll_no);

      const order = sortOrder === "desc" ? 1 : -1;
      return order * (rollNumberA - rollNumberB);
    });
    setStudents(sortedStudents);
  };

  // Function to handle sorting order change
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    sortStudents(); // Sort students when changing the order
  };

  const BoldStyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "16px", // Adjust the font size as needed
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#7BC9EB",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "14px",
    },
  }));

  // Function to handle the delete confirmation
  //Asynchronous functions allow you to work with promises using the await keyword. This makes it easier to handle asynchronous operations and makes the code more readable.
  //With async functions, you can use await to pause the execution of the function until a promise is resolved or rejected.

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/studentsData/${deleteTarget}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setStudents(students.filter((s) => s.id !== deleteTarget));
        console.log("Student deleted successfully");
      } else {
        console.error("Server error:", response.status, response.statusText);
      }
    } catch (err) {
      console.error(err.message);
    }

    // Close the delete dialog and reset deleteTarget
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  // Function to handle the delete cancelation
  const handleDeleteCancel = () => {
    // Close the delete dialog and reset deleteTarget
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  // Function to handle the delete action
  const handleDelete = (rollNo) => {
    // Set deleteTarget and open the delete dialog
    setDeleteTarget(rollNo);
    setDeleteDialogOpen(true);
  };

  // Function to handle the edit action

  const handleEdit = (id) => {
    const student = students.find((s) => s.id === id);
    setSelectedStudent(student);
    // setSelectedRollNo(rollNo);
    setEditDialogOpen(true);
  };

  // Function to handle the close of the edit dialog
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedStudent(null);
  };

  // Function to handle the edit form submission
  const handleEditSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/studentsData/${selectedStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      fetchStudents();
      if (response.ok) {
          // Display a success alert
          alert("Student updated successfully");
          
          handleCloseEditDialog();
      } else {
        // Display an alert for server error
        const responseData = await response.json();
        alert(responseData.error);
        console.error("Server error:", response.status, response.statusText);
      }
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <Fragment>
      <FormControl
        sx={{
          margin: "16px 20px",
          float: "right",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjust the opacity as needed
          borderRadius: "8px", // Add border-radius for a rounded look if desired
          padding: "10px", // Add padding for better spacing
        }}
      >
        <InputLabel
          id="sort-order-label"
          sx={{
            marginTop: "-6px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "4px",
            fontWeight: "bold",
            color: "black",
            width: "100",
            padding: "4px",
          }}
        >
          Sort Order
        </InputLabel>
        <Select
          labelId="sort-order-label"
          id="sort-order"
          value={sortOrder}
          onChange={handleSortOrderChange}
          variant="outlined"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table
          sx={{
            maxWidth: 900,
            margin: "20px auto 20px auto",
            padding: "20 50",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <BoldStyledTableCell>Roll No</BoldStyledTableCell>
              <BoldStyledTableCell align="center">Name</BoldStyledTableCell>
              <BoldStyledTableCell align="center">Class</BoldStyledTableCell>
              <BoldStyledTableCell align="center">
                Class Teacher
              </BoldStyledTableCell>
              <BoldStyledTableCell align="center">Remarks</BoldStyledTableCell>
              <BoldStyledTableCell align="center">Image</BoldStyledTableCell>
              <BoldStyledTableCell align="center">Actions</BoldStyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(
              (
                student //map function is used to traverse a list..here list is students
              ) => (
                <StyledTableRow key={student.roll_no}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {student.roll_no}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {student.students_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {student.class_info}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {student.class_teacher}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {student.remarks}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={student.image ? `data:image/jpeg;base64,${student.image}` : './images/Profile_Image.png'}
                      alt={`Student ${student.roll_no}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(student.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <InputStudents selectedRollNo={selectedRollNo} /> sending rollno to inputStudenst that would be send to add.js that would be send to axios to backend to be used to name the image */}

      {/* Edit Dialog */}
      <HandleEdit
        open={editDialogOpen}
        handleClose={handleCloseEditDialog}
        student={selectedStudent}
        handleSubmit={handleEditSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default List;
