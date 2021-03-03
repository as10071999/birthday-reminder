import { useState, useEffect } from "react";
import { authCheckState } from "../../actions/auth/authActions";
import { useDispatch } from "react-redux";
import View from "./View";
import AddPerson from "./AddPerson";
import { Grid } from "@material-ui/core";

export default function Home() {
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Checking Auth State");
    // dispatch(authCheckState());
    console.log("Dispatched");
  });
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
