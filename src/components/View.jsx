import React, { useState } from "react";
import data from "../data";
import { GridList, GridListTile, Paper, Avatar, Card } from "@material-ui/core";
function View() {
  const [people, setPeople] = useState(data);
  console.log("People Data", people);
  return (
    <>
      <Card>
        <GridList cols={1}>
          {people.map((person) => (
            <GridListTile key={person.id}>
              <Paper elevation={3}>
                <Avatar alt={person.name} src={person.image} />
                Name: {person.name}
                Age: {person.age}
              </Paper>
            </GridListTile>
          ))}
        </GridList>
      </Card>
    </>
  );
}

export default View;
