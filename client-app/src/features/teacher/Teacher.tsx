import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Grid } from "semantic-ui-react";
import TeacherFrom from "./TeacherFrom";
import { RootStoreContext } from "../../stores/rootStore";

const Teacher = (props: any) => {
  const rootStore = useContext(RootStoreContext);
  const { loadDesignations } = rootStore.designationStore;

  useEffect(() => {
    loadDesignations();
  }, [loadDesignations]);

  return (
    <Grid>
      <Grid.Column width={6}>
        <TeacherFrom />
      </Grid.Column>
      <Grid.Column width={10}></Grid.Column>
    </Grid>
  );
};

export default observer(Teacher);
