import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import CourseForm from "./CourseForm";
import { observer } from "mobx-react-lite";

const Course = () => {
  return (
    <Grid>
      <GridColumn width={7}>
        <CourseForm />
      </GridColumn>
      <GridColumn width={9}>Courses </GridColumn>
    </Grid>
  );
};

export default observer(Course);
