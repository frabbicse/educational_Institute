import React, { useContext } from "react";
import { Button, Dropdown, DropdownItem, Form, FormDropdown } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { ICourse } from "../../application/models/course";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../stores/rootStore";
import TextInput from "../../common/form/TextInput";
import { TextAreaInput } from "../../common/form/TextAreaInput";

interface IProps {
  course: ICourse | null;
}

const validate = combineValidators({
  name: isRequired("course name"),
  code: isRequired("course code"),
  credit: isRequired("course credit"),
});
const genderOptions = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const CourseForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { createCourse } = rootStore.courseStore;

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
          <Field component={FormDropdown} name="department" placeholder="Select Department" options={genderOptions} />
          <Field component={FormDropdown} name="semester" placeholder="Select Semester" options={genderOptions} label={{ htmlFor: "form-select-control-gender" }} />

          <Button type="submit">Submit</Button>
        </Form>
      )}
    />
  );
};

export default CourseForm;
