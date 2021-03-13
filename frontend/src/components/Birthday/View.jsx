import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBirthdays } from "../../actions/birthdays/birthdaysActions";
import axios from "axios";
import { Paper, Avatar, Grid, Typography } from "@material-ui/core";

function View({ reload }) {
  // const [people, setPeople] = useState();
  const people = useSelector((state) => state.birth);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  console.log("People Data", people);
  // console.log("Mounted");
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      let url = "http://127.0.0.1:8000/people/";

      const response = await axios.get(url);
      // console.log(response.data);
      dispatch(AddBirthdays(response.data));
      // setPeople([...response.data]);
      setIsFetching(false);
    }
    fetchData();
  }, [reload]);
  return (
    <>
      {!isFetching && (
        <Grid item container justify="center">
          <Grid item xs></Grid>
          <Grid item>
            <Paper elevation={5} style={{ width: "250px" }}>
              <Grid container direction="column" spacing={2}>
                {people.map((person, i) => {
                  const getAge = () => {
                    var parts = person.dob.match(/(\d+)/g);
                    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
                    let birthday = new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based

                    var ageDifMs = Date.now() - birthday.getTime();
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch
                    return Math.abs(ageDate.getUTCFullYear() - 1970);
                  };
                  let age = getAge();
                  return (
                    <Grid item container direction="row" key={person.id}>
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
                          <Typography variant="body1">{person.name}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">{age}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs></Grid>
                    </Grid>
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
