import { FORM_ERROR, FormApi, SubmissionErrors } from "final-form";
import React, { useContext } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { ISemester } from "../../application/models/semester";
import { Button, Form, FormField, Input } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { error } from "console";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../common/form/ErrorMessage";
import TextInput from "../../common/form/TextInput";
import { values } from "mobx";

interface IProps {
  course: ISemester | null;
}

const validate = combineValidators({
  name: isRequired("name"),
});

const SemesterForm = () => {
  const rootStore = useContext(RootStoreContext);

  const { createSemester } = rootStore.semesterStore;

  return (
    <FinalForm
      onSubmit={(values: ISemester) =>
        createSemester(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtyFieldsSinceLastSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field component={TextInput} placeholder="Enter Semester Name" name="name" />

          {submitError && !dirtyFieldsSinceLastSubmit && pristine && <ErrorMessage error={submitError} text="Enter Name" />}
          <Button type="submit" loading={submitting} positive content="Save" />
        </Form>
      )}
    />
  );
};

export default SemesterForm;
