import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@material-ui/core";
function AddPerson() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", image: "", dob: "" });
  const [error, setError] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputFieldChange = (event, name) => {
    const { target } = event;
    setForm({ ...form, [name]: target.value });
  };
  const submitButtonHandler = () => {
    if (form.name && form.dob && form.image) {
      setError(false);
    } else {
      setError(true);
    }

    console.log(form);
  };
  return (
    <div>
      <Fab aria-label="Add" color="primary" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <FormControl required error={error}>
            <form
              onSubmit={submitButtonHandler}
              className=""
              noValidate
              autoComplete="off"
            >
              <Grid container direction="column">
                <FormControl required>
                  <TextField
                    required
                    id="standard-required"
                    label="Name"
                    defaultValue=""
                    placeholder="Enter your name"
                    onChange={(event) => handleInputFieldChange(event, "name")}
                    name="name"
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="date"
                    label="Birthdate"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => handleInputFieldChange(event, "dob")}
                    name="dob"
                  />
                </FormControl>
              </Grid>
            </form>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={submitButtonHandler} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddPerson;
