import React, { useContext } from 'react'
import { Grid, Table, Button } from 'semantic-ui-react';

import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../../stores/rootStore';

const DepartmetnList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { department: department, departments, loadEditForm } = rootStore.departmentStore;

  return (
    
    <Grid>
      <Grid.Column width={10}>
        <Table celled >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Department Name</Table.HeaderCell>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              departments.map(department => (
                <Table.Row key={department.id}>
                  <Table.Cell >{department.name} </Table.Cell>
                  <Table.Cell>{department.code}</Table.Cell>
                  <Table.Cell>

                    <Button
                      name={department.id}
                      loading={rootStore.departmentStore.submitting}
                      onClick={(e) => loadEditForm(department.id)}
                      color='blue' content='Edit' />
                    {/* <Button onClick = {(e) => deleteDepartment(e, department.id)} color='red' content='Delete' /> */}

                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  )
}

export default observer(DepartmetnList);