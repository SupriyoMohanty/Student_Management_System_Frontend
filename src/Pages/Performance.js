// Import necessary components and hooks
import React, { Fragment, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
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
import { Card } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HandleMarks from "../Components/MarksStudents";
import config from "../config";
import PieChartComponent from "../Components/PieChart.Performance";

const PieChartContainer = styled("div")({
  width: "500px",
  margin: "20px",
});

// Define styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#7BC9EB",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Define the List component
const List = () => {
  const [students, setStudents] = useState([]);
  const [MarksDialogOpen, setMarksDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedClass, setSelectedClass] = useState("all"); // Added class filter state

  const location = useLocation();
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      let apiEndpoint = `${config.apiBaseUrl}/studentsData`;

      // Check if a specific class is selected
      if (selectedClass !== "all") {
        const classNumber = getClassNumber(selectedClass);
        apiEndpoint += `/${classNumber}`;
      }
      console.log("Selected Class: ", selectedClass);
      console.log("Selected Class API: ", apiEndpoint);

      const response = await fetch(apiEndpoint);

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        console.log("SetStudents1", students);
        //console.log("Fetched students data:", data);
      } else {
        console.error("Server error:", response.status, response.statusText);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const getClassNumber = (className) => {
    // Assuming the class name is in the format "Class X"
    const match = className.match(/\d+/);
    return match ? match[0] : className.replace(/\D/g, ""); // Remove non-digits
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedClass]);

  const sortStudents = () => {
    const sortedStudents = [...students].sort((a, b) => {
      const rollNumberA = parseInt(a.roll_no);
      const rollNumberB = parseInt(b.roll_no);
      const order = sortOrder === "desc" ? 1 : -1;
      return order * (rollNumberA - rollNumberB);
    });
    setStudents(sortedStudents);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    sortStudents();
  };

  const handleClassFilterChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const BoldStyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "16px",
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#7BC9EB",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "14px",
    },
  }));

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

    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleDelete = (rollNo) => {
    setDeleteTarget(rollNo);
    setDeleteDialogOpen(true);
  };

  const handleMarks = (id) => {
    const student = students.find((s) => s.id === id);
    setSelectedStudent(student);
    setMarksDialogOpen(true);
  };

  const handleCloseMarksDialog = () => {
    setMarksDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleMarksSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/studentsData/marks/${selectedStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Student updated successfully");
        fetchStudents();
        handleCloseMarksDialog();
      } else {
        console.error("Server error:", response.status, response.statusText);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to handle going back to the home page
  const handleBackToHome = () => {
    try {
      const isFromHome = location.state && location.state.fromHome;

      if (isFromHome) {
        navigate("/home");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
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
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: "16px 20px", position: "absolute", top: 0, right: 0 }}
        onClick={() => handleBackToHome()}
      >
        Back To Home
      </Button>
      <Card style={{
          maxWidth: 650,
          margin: "0 auto",
          marginBottom:"10px",
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
        Students Performance Corner
      </Typography>
      </Card>
      <FormControl
        sx={{
          margin: "16px 20px",
          float: "right",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          padding: "10px",
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
      <FormControl
        sx={{
          margin: "16px 20px",
          float: "right",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <InputLabel
          id="class-filter-label"
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
          Class Filter
        </InputLabel>
        <Select
          labelId="class-filter-label"
          id="class-filter"
          value={selectedClass}
          onChange={handleClassFilterChange}
          variant="outlined"
        >
          <MenuItem value="all">All Classes</MenuItem>
          <MenuItem value="Class 1">Class 1</MenuItem>
          <MenuItem value="Class 2">Class 2</MenuItem>
          <MenuItem value="Class 3">Class 3</MenuItem>
          <MenuItem value="Class 4">Class 4</MenuItem>
          <MenuItem value="Class 5">Class 5</MenuItem>
          <MenuItem value="Class 6">Class 6</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <PieChartContainer sx={{
          float:"right"
        }}>
         <Typography variant="h6" gutterBottom>Per Subject Marks Distribution in % age 
      </Typography>
        <PieChartComponent students={students} />
      </PieChartContainer>

        
        <Table
          sx={{
            maxWidth: 920,
            margin: "10px 10px 10px",
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
              <BoldStyledTableCell align="center">Maths</BoldStyledTableCell>
              <BoldStyledTableCell align="center">Science</BoldStyledTableCell>
              <BoldStyledTableCell align="center">
                Social Science
              </BoldStyledTableCell>
              <BoldStyledTableCell align="center">Actions</BoldStyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
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
                <StyledTableCell component="th" scope="row" align="center">
                  {student.maths}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {student.science}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {student.social_science}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleMarks(student.id)}
                    sx={{ margin: "1px 1px 5px 1px" }}
                  >
                    Add Student Marks
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <HandleMarks
        open={MarksDialogOpen}
        handleClose={handleCloseMarksDialog}
        student={selectedStudent}
        handleSubmit={handleMarksSubmit}
      />

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
