import { observer } from "mobx-react";
import React, { useContext } from "react";
import { Grid, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import Moment from "react-moment";

const StudentList = () => {
  const rootStore = useContext(RootStoreContext);
  const { studentList } = rootStore.studentStore;

  console.log("studentlist", studentList);

  return (
    <Grid>
      <Grid.Column>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sl.</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Reg. No.</Table.HeaderCell>
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
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.regNo}</Table.Cell>
                <Table.Cell>{student?.email}</Table.Cell>
                <Table.Cell>{student?.contactNo}</Table.Cell>
                <Table.Cell>
                  <Moment format="DD/MM/YYYY">{student?.date}</Moment>
                </Table.Cell>
                <Table.Cell>{student?.address}</Table.Cell>
                <Table.Cell>{student?.departmentName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default observer(StudentList);
