import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { ITeacher } from "../../application/models/teacher";
import { error } from "console";
import { FORM_ERROR } from "final-form";
import { RootStoreContext } from "../../stores/rootStore";
import { combineValidators, composeValidators, createValidator, isNumeric, isRequired } from "revalidate";
import validation from "../../common/helper/validation";
import { Button, Form } from "semantic-ui-react";
import TextInput from "../../common/form/TextInput";
import { TextAreaInput } from "../../common/form/TextAreaInput";
import DropdownInput from "../../common/form/DropdownInput";
import ErrorMessage from "../../common/form/ErrorMessage";

const validate = combineValidators({
  name: isRequired("Enter Name"),
  email: isRequired("Enter Mail"),
  creditTaken: isNumeric(""),
});

const TeacherFrom = () => {
  const rootStore = useContext(RootStoreContext);

  const { createTeacher } = rootStore.teacherStore;
  const { designations } = rootStore.designationStore;
  const { departments } = rootStore.departmentStore;

  const [selectedDept, setSelectedDept] = useState();
  const [selectedDesignation, setSelectedDesignation] = useState();

  const designationOptions = designations
    .filter((item) => item.name)
    .map((item) => ({
      key: item.designationId,
      text: item.name,
      value: item.designationId,
    }));

  const departmentOptions = departments
    .filter((item) => item.name)
    .map((item) => ({
      key: item.departmentId,
      text: item.name,
      value: item.departmentId,
    }));

  return (
    <FinalForm
      onSubmit={(values: ITeacher) =>
        createTeacher(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtyFieldsSinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Field component={TextInput} name={"name"} placeholder="Enter Name" />
          <Field component={TextAreaInput} name={"description"} placeholder="Enter Address" />
          <Field component={TextInput} name={"email"} placeholder="Enter Email" />
          <Field component={TextInput} name={"contact"} placeholder="Enter Contact" />

          <Field component={DropdownInput} name={"designationId"} placeholder="Select Designation" fluid selection options={designationOptions} onChange={(e: any, data: any) => setSelectedDesignation(data.value)} value={selectedDesignation} />

          <Field component={DropdownInput} name="departmentId" fluid selection placeholder="Select Department" options={departmentOptions} onChange={(e: any, data: any) => setSelectedDept(data.value)} value={selectedDept} />

          <Field component={TextInput} name={"creditTaken"} placeholder="Enter Credit" />
          {submitError && !dirtyFieldsSinceLastSubmit && pristine && <ErrorMessage error={submitError} text="" />}
          <Button type="submit" loading={submitting} floated="right" positive content="Save" />
        </Form>
      )}
    />
  );
};

export default TeacherFrom;
