import { useState, useEffect } from "react";
import View from "./View";
import AddPerson from "./AddPerson";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";

export default function Home() {
  const [reload, setReload] = useState(0);
  return (
    <div>
      <Grid container direction="column" spacing={10} justify="center">
        <Grid sm item></Grid>
        <Grid item style={{ backgroundColor: "white" }}>
          <View reload={reload} />
        </Grid>
        <Grid item style={{ backgroundColor: "white" }}>
          <Grid container justify="center">
            <AddPerson setreload={setReload} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
