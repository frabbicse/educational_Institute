import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import SemesterForm from "./SemesterForm";
import SemesterList from "./SemesterList";
import { RootStoreContext } from "../../stores/rootStore";

const Semester = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadSemesters } = rootStore.semesterStore;

  useEffect(() => {
    loadSemesters();
  }, [loadSemesters]);

  return (
    <Grid>
      <GridColumn width={2}></GridColumn>
      <GridColumn width={5}>
        <SemesterForm />
      </GridColumn>
      <GridColumn width={5}>
        <SemesterList />
      </GridColumn>
      <GridColumn width={2}></GridColumn>
    </Grid>
  );
};

export default observer(Semester);
