import React, { useContext } from "react";
import { Button, Form, FormDropdown } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { ICourse } from "../../application/models/course";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../stores/rootStore";
import TextInput from "../../common/form/TextInput";
import { TextAreaInput } from "../../common/form/TextAreaInput";
import ErrorMessage from "../../common/form/ErrorMessage";

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
  const { semesters } = rootStore.semesterStore;

  const departmentOptions = departments
    .filter((item) => item.name)
    .map((item) => ({
      key: item.departmentId,
      text: item.name,
      value: item.departmentId,
    }));
  const semesterOptions = semesters
    .filter((item) => item.name)
    .map((item) => ({
      key: item.semesterId,
      text: item.name,
      value: item.semesterId,
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
          <Field component={FormDropdown} name="department" fluid selection placeholder="Select Department" options={departmentOptions} />
          <Field component={FormDropdown} fluid selection name="semester" placeholder="Select Semester" options={semesterOptions}  />
          {submitError && !dirtyFieldsSinceLastSubmit && pristine && <ErrorMessage error={submitError} text="" />}
          <Button loading={submitting} floated="right" positive content="Save" />
        </Form>
      )}
    />
  );
};

export default CourseForm;
