import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
} from "@material-ui/core";
import axios from "axios";

function AddPerson({ setreload }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", image: "", dob: "" });
  const [error, setError] = useState({
    submit: false,
    name: false,
    dob: false,
  });
  // console.log(error);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError({ submit: false, name: false, dob: false });
    setOpen(false);
  };
  const handleInputFieldChange = (event, name) => {
    const { target } = event;
    setForm({ ...form, [name]: target.value });
  };
  const submitButtonHandler = async () => {
    if (form.name && form.dob && form.image) {
      var Error = { submit: false, name: false, dob: false };
      setError({ ...Error });
      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("name", form.name);
      formData.append("dob", form.dob);

      let url = `http://127.0.0.1:8000/people/add/`;
      await axios.post(url, formData).catch((err) => console.log(err));
      //console.log("Sent Post Request");
      setreload((prev) => {
        return prev + 1;
      });
      handleClose();
    } else {
      Error = { submit: true, name: false, dob: false };
      if (!form.name) {
        Error.name = true;
      }
      if (!form.dob) {
        Error.dob = true;
      }
      if (!form.image) {
        Error.image = true;
      }
      setError({ ...Error });
    }
    //console.log(form);
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
        <DialogTitle id="alert-dialog-title">{"Enter Details"}</DialogTitle>
        <DialogContent>
          <FormControl required error={error.submit}>
            <form
              onSubmit={submitButtonHandler}
              className=""
              noValidate
              autoComplete="off"
            >
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <FormControl required error={error.name}>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <br />
                    <br />
                    <TextField
                      required
                      id="standard-required"
                      placeholder="Enter your name"
                      onChange={(event) =>
                        handleInputFieldChange(event, "name")
                      }
                      name="name"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl required error={error.dob}>
                    <InputLabel htmlFor="my-input">Birthday</InputLabel>
                    <br />
                    <br />
                    <TextField
                      id="date"
                      type="date"
                      onChange={(event) => handleInputFieldChange(event, "dob")}
                      name="dob"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl required error={error.image}>
                    <InputLabel htmlFor="my-input">Profile Pic</InputLabel>
                    <br />
                    <br />
                    <Button variant="contained" component="label">
                      Upload Pic
                      <input
                        type="file"
                        hidden
                        onChange={(event) => {
                          const files = event.target.files;
                          //console.log(files[0]);
                          setForm({ ...form, ["image"]: files[0] });
                        }}
                      />
                    </Button>
                    {form.image && (
                      <Card>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          image={URL.createObjectURL(form.image)}
                          title="Contemplative Reptile"
                        />
                      </Card>
                    )}
                  </FormControl>
                </Grid>
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
