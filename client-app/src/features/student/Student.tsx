import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../stores/rootStore";
import { LoadingComponent } from "../../layout/LoadingComponent";
import { observer } from "mobx-react";
import StudentForm from "./StudentForm";

const Student = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadStudents, loadingInital } = rootStore.studentStore;

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  if (loadingInital) {
    return <LoadingComponent content="Loading Students...." />;
  }

  return (
    <div>
      <div>
        <StudentForm />
          </div>
          <div>
              
          </div>
    </div>
  );
};

export default observer(Student);
