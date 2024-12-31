import React, { useContext, useState } from "react";
import { IStudent } from "../../application/models/student";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../stores/rootStore";
import { FORM_ERROR } from "final-form";

import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../common/form/TextInput";
import { DateInput } from "../../common/form/DateInput";
import DropdownInput from "../../common/form/DropdownInput";
import ErrorMessage from "../../common/form/ErrorMessage";
import { Button, Form, TextArea } from "semantic-ui-react";
import { TextAreaInput } from "../../common/form/TextAreaInput";

interface IProps {
  student: IStudent | null;
}

const validate = combineValidators({
  name: isRequired("name"),
  email: isRequired("email"),
  contact: isRequired("contact no"),
});

const StudentForm = () => {
  const [selectedDept, setSelectedDept] = useState();

  const rootStore = useContext(RootStoreContext);
  const { createStudent } = rootStore.studentStore;
  const { departments } = rootStore.departmentStore;

  const departmentOptions = departments
    .filter((item) => item.name)
    .map((item) => ({
      key: item.departmentId,
      text: item.name,
      value: item.departmentId,
    }));
  return (
    <FinalForm
      onSubmit={(values: IStudent) =>
        createStudent(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtyFieldsSinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Field component={TextInput} name="name" placeholder="Enter Name" />
          <Field component={TextInput} name="email" placeholder="Enter Email" />
          <Field component={TextInput} name="contact" placeholder="Enter Contact No." />

          <Field component={DateInput} name="date" placeholder="Enter Date" />

          <Field component={TextAreaInput} name="address" placeholder="Enter address" />
          
          <Field component={DropdownInput} name="departmentId" fluid selection placeholder="Select Department" options={departmentOptions} onChange={(e: any, data: any) => setSelectedDept(data.value)} value={selectedDept} />

          {submitError && !dirtyFieldsSinceLastSubmit && pristine && <ErrorMessage error={submitError} text="" />}
          <Button type="submit" loading={submitting} floated="right" positive content="Save" />
        </Form>
      )}
    />
  );
};

export default StudentForm;
