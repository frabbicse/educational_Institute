import React, { useContext, useState } from "react";
import { Grid, Table } from "semantic-ui-react";
import CourseAssignForm from "./CourseAssignForm";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../stores/rootStore";
import DropdownInput from "../../common/form/DropdownInput";
import { Field } from "react-final-form";
import { Form } from "react-router-dom";

const CourseAssignList = () => {
  const rootStore = useContext(RootStoreContext);
  const { departments } = rootStore.departmentStore;

  const [selectedDept, setSelectedDept] = useState();
  const departmentOptions = departments
    .filter((item) => item.name)
    .map((item) => ({
      key: item.departmentId,
      text: item.name,
      value: item.departmentId,
    }));
  return (
    <Grid>
      {/* <Form onSubmit={""}>
        <Field component={DropdownInput} name="departmentId" fluid selection placeholder="Select Department" options={departmentOptions} onChange={(e: any, data: any) => setSelectedDept(data.value)} value={selectedDept} />
      </Form> */}

      <Grid.Column width={10}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sl.</Table.HeaderCell>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>Name/Title</Table.HeaderCell>
              <Table.HeaderCell>Semester</Table.HeaderCell>
              <Table.HeaderCell>Assigned To</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default observer(CourseAssignList);
