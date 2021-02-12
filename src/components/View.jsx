import React, { useState } from "react";
import data from "../data";
import {
  GridList,
  GridListTile,
  Paper,
  Avatar,
  Card,
  Grid,
  Typography,
} from "@material-ui/core";
function View() {
  const [people, setPeople] = useState(data);
  console.log("People Data", people);
  var size = 50;
  return (
    <>
      <Grid item container justify="center">
        <Grid item xs></Grid>
        <Grid item>
          <Paper elevation={5} style={{ width: "250px" }}>
            <Grid container direction="column" spacing={2}>
              {people.map((person, i) => {
                return (
                  <>
                    <Grid item container direction="row">
                      <Grid item xs></Grid>
                      <Grid item style={{ backgroundColor: "white" }} xs={2}>
                        <Avatar src={person.image} />
                      </Grid>
                      <Grid item xs></Grid>
                      <Grid
                        item
                        container
                        direction="column"
                        style={{ backgroundColor: "white" }}
                        xs={7}
                      >
                        <Grid item>
                          <Typography variant="body1" component="body1">
                            {person.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" component="body2">
                            {person.age}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs></Grid>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs></Grid>
      </Grid>
    </>
  );
}

export default View;
