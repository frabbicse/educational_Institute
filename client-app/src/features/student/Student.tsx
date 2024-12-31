import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../stores/rootStore";
import { LoadingComponent } from "../../layout/LoadingComponent";
import { observer } from "mobx-react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import { Grid } from "semantic-ui-react";

const Student = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadStudents, loadingInital } = rootStore.studentStore;

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  if (loadingInital) {
    return <LoadingComponent content="Loading Students...." />;
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <StudentForm />
      </Grid.Column>
      <Grid.Column width={10}>
        <StudentList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(Student);
