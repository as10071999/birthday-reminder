import React, { useState, useEffect } from "react";
import data from "../data";
import axios from "axios";
import { Paper, Avatar, Grid, Typography } from "@material-ui/core";
function View() {
  const [people, setPeople] = useState(data);
  const [isFetching, setIsFetching] = useState(true);
  console.log("People Data", people);
  useEffect(async () => {
    setIsFetching(true);
    let url = "http://127.0.0.1:8000/people/";

    const response = await axios.get(url);
    console.log(response.data);
    setPeople(response.data);
    setIsFetching(false);
  }, []);
  return (
    <>
      {!isFetching && (
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
                              {/* {person.age} */}Hello
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
      )}
    </>
  );
}

export default View;
