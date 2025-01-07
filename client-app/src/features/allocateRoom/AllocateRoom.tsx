import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../stores/rootStore";
import { LoadingComponent } from "../../layout/LoadingComponent";
import { Grid } from "semantic-ui-react";
import AllocateRoomForm from "./AllocateRoomForm";
import AllocateRoomList from "./AllocateRoomList";
import { observer } from "mobx-react";

const AllocateRoom = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingAllocateRooms, loadingInitital } = rootStore.allocateRoomStore;
  const { loadRooms } = rootStore.roomStore;
  const { loadDays } = rootStore.dayStore;

  useEffect(() => {
    loadingAllocateRooms();
    loadRooms();
    loadDays();
  }, [loadingAllocateRooms, loadRooms, loadDays]);

  //   if (loadingInitital) {
  //     return <LoadingComponent content="Loading..." />;
  //   }

  return (
    <Grid>
      <Grid.Column width={6}>
        <AllocateRoomForm />
      </Grid.Column>
      <Grid.Column width={10}>
        <AllocateRoomList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(AllocateRoom);
