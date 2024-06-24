import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Add = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    roll_no: "",
    students_name: "",
    class_info: "",
    class_teacher: "",
    remarks: "",
    image_url: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (e.target.name === "roll_no" && (isNaN(inputValue) || inputValue < 0)) {
      return;
    }

    if (e.target.type === "file") {
      const file = e.target.files[0];

      if (file) {
        if (file.type.startsWith("image/")) { // Check if the selected file is an image
          const reader = new FileReader();

          reader.onloadend = () => {
            setFormData({
              ...formData,
              [e.target.name]: reader.result,
            });
            setImagePreview(reader.result); // Set the image preview
          };

          reader.readAsDataURL(file);
        } else {
          alert("Invalid file type. Please choose an image file.");
          e.target.value = null;
          return;
        }
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: inputValue,
      });
    }
  };

  const handleClose = () => {
    setFormData({
      roll_no: "",
      students_name: "",
      class_info: "",
      class_teacher: "",
      remarks: "",
      image_url: "",
    });
    setImagePreview(null); // Clear image preview on close
    onClose();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter student details:</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="roll_no"
            name="roll_no"
            label="Roll_no"
            type="number"
            fullWidth
            variant="standard"
            value={formData.roll_no || ""}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="students_name"
            name="students_name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.students_name || ""}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="class_info"
            name="class_info"
            label="Class Info"
            type="text"
            fullWidth
            variant="standard"
            value={formData.class_info || ""}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="class_teacher"
            name="class_teacher"
            label="Class Teacher"
            type="text"
            fullWidth
            variant="standard"
            value={formData.class_teacher || ""}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="remarks"
            name="remarks"
            label="Remarks"
            type="text"
            fullWidth
            variant="standard"
            value={formData.remarks || ""}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="image_url"
            name="image_url"
            label="Image URL"
            type="file"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ marginTop: "10px", maxWidth: "50%" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Add;
