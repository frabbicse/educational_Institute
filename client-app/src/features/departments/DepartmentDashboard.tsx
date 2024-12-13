import React, { useEffect, useContext } from "react";

import { observer } from "mobx-react";
import { RootStoreContext } from "../../stores/rootStore";

import { LoadingComponent } from "../../layout/LoadingComponent";
import DepartmentList from "./DepartmentList";

import { Grid } from "semantic-ui-react";
import DepartmentForm from "./DepartmentForm";

const DepartmentDashboard = (props: any) => {
  const rootStore = useContext(RootStoreContext);
  const { loadDepartments, loadingInitial } = rootStore.departmentStore;

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  if (loadingInitial) {
    return <LoadingComponent content="Loading Departments...." />;
  }

  let initFormState = {
    id: 0,
    name: "",
    code: "",
  };
  return (
    <Grid>
      <Grid.Column width={6}>
        <DepartmentForm />
      </Grid.Column>
      <Grid.Column width={10}>
        <DepartmentList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(DepartmentDashboard);
