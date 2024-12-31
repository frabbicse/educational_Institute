import { observer } from "mobx-react";
import React, { useContext } from "react";
import { Grid, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";

const StudentList = () => {
  const rootStore = useContext(RootStoreContext);
  const { studentList } = rootStore.studentStore;

  return (
    <Grid>
      <Grid.Column>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sl.</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Contact</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {studentList.map((student, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{student.Name}</Table.Cell>
                <Table.Cell>{student?.Email}</Table.Cell>
                <Table.Cell>{student?.ContactNo}</Table.Cell>
                <Table.Cell>{student?.Date}</Table.Cell>
                <Table.Cell>{student?.Address}</Table.Cell>
                <Table.Cell>{student?.DepartmentName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default observer(StudentList);
