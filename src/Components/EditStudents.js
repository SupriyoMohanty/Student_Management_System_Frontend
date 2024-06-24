import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const HandleEdit = ({ open, handleClose, student, handleSubmit }) => {

  const [imagePreview, setImagePreview] = useState(null);


  const [formData, setFormData] = useState({
    roll_no: "",
    students_name: "",
    class_info: "",
    class_teacher: "",
    remarks: "",
    image_url_update: null, // Initialize image to null
  });

  useEffect(() => {
    if (student) {
      setFormData({
        roll_no: student.roll_no || "",
        students_name: student.students_name || "",
        class_info: student.class_info || "",
        class_teacher: student.class_teacher || "",
        remarks: student.remarks || "",
        image_url_update: null, // Reset image when student changes
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
  
    if (e.target.name === "roll_no" && (isNaN(inputValue) || inputValue < 0)) {
      return;
    }
  
    if (e.target.type === 'file') {
      const file = e.target.files[0];
  
      if (file) {
        // Check if the selected file is of type 'image/jpeg' (JPEG format)
        if (file.type === 'image/jpeg') {
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
          // Display an error or inform the user about the invalid file type
          alert("Invalid file type. Please choose a .jpg file.");
          // Reset the file input field and set a flag to indicate the error
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


  const handleCloseDialog = () => {
    setFormData({
      roll_no: "",
      students_name: "",
      class_info: "",
      class_teacher: "",
      remarks: "",
      //image_url_update: null, // Reset image on dialog close
    });
    setImagePreview(null);
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
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit the student details:</DialogContentText>
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
          value={formData.students_name}
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
          value={formData.class_info}
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
          value={formData.class_teacher}
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
          value={formData.remarks}
          onChange={handleChange}
        />
        <input
          margin="dense"
          id="image_url_update"
          name="image_url_update"
          label="Image URL"
          type="file" 
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
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HandleEdit;
