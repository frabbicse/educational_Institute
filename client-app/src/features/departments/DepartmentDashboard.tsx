import React, { useEffect, useContext } from "react";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/rootStore";

import { LoadingComponent } from "../../layout/LoadingComponent";
import DepartmentList from "./DepartmentList";

import { Grid } from "semantic-ui-react";

const DepartmentDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadDepartments, loadingInitial } = rootStore.departmentStore;

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  if (loadingInitial) {
    return <LoadingComponent content="Loading Departments...." />;
  }

  return (
    <Grid>
      <Grid.Column width={6}></Grid.Column>
      <Grid.Column width={10}>
        <DepartmentList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(DepartmentDashboard);
