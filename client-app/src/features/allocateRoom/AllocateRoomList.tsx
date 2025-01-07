import React, { useContext } from "react";
import { RootStoreContext } from "../../stores/rootStore";
import { Grid, Tab, Table } from "semantic-ui-react";
import { observer } from "mobx-react";

const AllocateRoomList = () => {
  const rootStore = useContext(RootStoreContext);

  const { allocatedRoomList } = rootStore.allocateRoomStore;

  return (
    <Grid>
      <Grid.Column>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sl.</Table.HeaderCell>
              <Table.HeaderCell>Course Code</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Schedule Info.</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Cell>1.</Table.Cell>
            <Table.Cell>CSE-101</Table.Cell>
            <Table.Cell>Computer Programming</Table.Cell>
            <Table.Cell>Room No: 302, Tue, 9.00am-10.00am</Table.Cell>
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default observer(AllocateRoomList);
