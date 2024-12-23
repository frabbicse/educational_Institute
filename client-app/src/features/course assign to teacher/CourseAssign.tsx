import React from "react";
import { Grid } from "semantic-ui-react";
import CourseAssignForm from "./CourseAssignForm";
import CourseAssignList from "./CourseAssignList";

const CourseAssign = () => {
  return (
    <Grid>
      <Grid.Column width={6}>
        <CourseAssignForm />
      </Grid.Column>
      <Grid.Column width={10}>
        <CourseAssignList />
      </Grid.Column>
    </Grid>
  );
};

export default CourseAssign;
