import { useState } from "react";
import AddPerson from "./components/AddPerson";
import View from "./components/View";
import { Grid } from "@material-ui/core";
function App() {
  const [reload, setReload] = useState(0);
  return (
    <>
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
    </>
  );
}

export default App;
