import React, { useContext } from "react";
import { Grid, Label, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react";

const SemesterList = () => {
  const rootStore = useContext(RootStoreContext);
  const { semesters } = rootStore.semesterStore;

  console.log("loadSemesters", semesters);

  return (
    <Grid>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Sl</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {semesters.map((sem, inx) => (
            <TableRow>
              <TableCell>{inx + 1}</TableCell>
              <TableCell>{sem.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default observer(SemesterList);
