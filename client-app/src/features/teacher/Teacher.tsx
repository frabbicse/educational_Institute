import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Grid } from "semantic-ui-react";
import TeacherFrom from "./TeacherFrom";
import { RootStoreContext } from "../../stores/rootStore";
import TeacherList from "./TeacherList";

const Teacher = (props: any) => {
  const rootStore = useContext(RootStoreContext);
  const { loadTeachers } = rootStore.teacherStore;
  const { loadDesignations } = rootStore.designationStore;

  useEffect(() => {
    loadTeachers();
    loadDesignations();
  }, [loadTeachers, loadDesignations]);

  return (
    <Grid>
      <Grid.Column width={5}>
        <TeacherFrom />
      </Grid.Column>
      <Grid.Column width={11}>
        <TeacherList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(Teacher);
