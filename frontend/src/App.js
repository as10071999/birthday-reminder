import AddPerson from "./components/AddPerson";
import View from "./components/View";
import { Grid } from "@material-ui/core";
function App() {
  return (
    <>
      <Grid container direction="column" spacing={10} justify="center">
        <Grid sm item></Grid>
        <Grid item style={{ backgroundColor: "white" }}>
          <View />
        </Grid>
        <Grid item style={{ backgroundColor: "white" }}>
          <Grid container justify="center">
            <AddPerson />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
