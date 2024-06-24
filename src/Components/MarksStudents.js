import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const HandleMarks = ({ open, handleClose, student, handleSubmit }) => {

  const [formData, setFormData] = useState({
    Maths: "",
    Science: "",
    Social_Science: ""
  });

  useEffect(() => {
    if (student) {
      setFormData({
        Maths: student.maths || "",
        Science: student.science || "",
        Social_Science: student.social_science || ""

      });
    }
  }, [student]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // Handle other input types
    setFormData({
      ...formData,
      [e.target.name]: inputValue,
    });
  };


  const handleCloseDialog = () => {
    setFormData({
      Maths: "",
      Science: "",
      Social_Science: ""
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          handleSubmit(formData);
          handleCloseDialog();
        },
      }}
    >
      <DialogTitle>Add Student Marks Student</DialogTitle>
      <DialogContent>
        <DialogContentText>Student marks detail:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="Maths"
          name="Maths"
          label="Maths"
          type="number"
          fullWidth
          variant="standard"
          value={formData.Maths || ""}
          onChange={handleChange}
        />

        <TextField
          margin="dense"
          id="Science"
          name="Science"
          label="Science"
          type="number"
          fullWidth
          variant="standard"
          value={formData.Science|| ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="Social_Science"
          name="Social_Science"
          label="Social_Science"
          type="number"
          fullWidth
          variant="standard"
          value={formData.Social_Science || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HandleMarks;
