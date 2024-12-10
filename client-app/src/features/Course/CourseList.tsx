import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";

const CourseList = () => {
  const rootStore = useContext(RootStoreContext);
  const { courseList } = rootStore.courseStore;

  return (
    <Grid>
      <Grid.Column>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sl</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>Credit</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Semester</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {courseList &&
              courseList.map((course, indx) => (
                <Table.Row>
                  <Table.Cell>{indx + 1}</Table.Cell>
                  <Table.Cell>{course?.name}</Table.Cell>
                  <Table.Cell>{course?.code}</Table.Cell>
                  <Table.Cell>{course?.credit}</Table.Cell>
                  <Table.Cell>{course?.deptName}</Table.Cell>
                  <Table.Cell>{course?.semesterName}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default observer(CourseList);
