import React, { useContext } from "react";
import { Grid, Tab, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

const TeacherList = () => {
  const rootStore = useContext(RootStoreContext);
  const { teacherList } = rootStore.teacherStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sl.</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Contact</Table.HeaderCell>
              <Table.HeaderCell>Designation</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Credit Taken</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {teacherList.map((teacher, index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{teacher?.name}</Table.Cell>
                <Table.Cell>{teacher?.address}</Table.Cell>
                <Table.Cell>{teacher?.email}</Table.Cell>
                <Table.Cell>{teacher?.contactNo}</Table.Cell>
                <Table.Cell>{teacher?.designation}</Table.Cell>
                <Table.Cell>{teacher?.departmentName}</Table.Cell>
                <Table.Cell>{teacher?.creditTaken}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default observer(TeacherList);
