import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import CourseForm from "./CourseForm";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/rootStore";

const Course = () => {
  const rootStore = useContext(RootStoreContext);

  const { loadSemesters } = rootStore.semesterStore;

  useEffect(() => {
    loadSemesters();
  }, [loadSemesters]);

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
