import React, { useContext, useState } from "react";
import { Button, Dropdown, DropdownItem, Form, FormDropdown } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { ICourse } from "../../application/models/course";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../stores/rootStore";
import TextInput from "../../common/form/TextInput";
import { TextAreaInput } from "../../common/form/TextAreaInput";
import { log } from "console";

interface IProps {
  course: ICourse | null;
}

const validate = combineValidators({
  name: isRequired("course name"),
  code: isRequired("course code"),
  credit: isRequired("course credit"),
});

const CourseForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { createCourse } = rootStore.courseStore;
  const { departments } = rootStore.departmentStore;
  const { semesterList } = rootStore.semesterStore;

  console.log(semesterList,"semesterlist");
  

  const departmentOptions = departments
    .filter((item) => item.name) // Filter out items without a name
    .map((item) => ({
      key: item.departmentId.toString(), // Use departmentId as the key
      text: item.name, // Use the name as the text
      value: item.departmentId, // Use departmentId as the value
    }));
  const semesterOptions = semesterList
    .filter((item) => item.Name) // Filter out items without a name
    .map((item) => ({
      key: item.SemesterId.toString(), // Use departmentId as the key
      text: item.Name, // Use the name as the text
      value: item.SemesterId, // Use departmentId as the value
    }));

  return (
    <FinalForm
      onSubmit={(values: ICourse) => createCourse(values).catch((error) => ({ [FORM_ERROR]: error }))}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtyFieldsSinceLastSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field component={TextInput} name="code" placeholder="Code" />
          <Field component={TextInput} name="name" placeholder="Name" />
          <Field component={TextInput} name="credit" placeholder="Credit" />
          <Field component={TextAreaInput} name="description" placeholder="Description" />
          <Dropdown fluid selection placeholder="Select Department" options={departmentOptions} />
          <Dropdown fluid selection name="semester" placeholder="Select Semester" options={semesterOptions} />

          <Button type="submit">Submit</Button>
        </Form>
      )}
    />
  );
};

export default CourseForm;
