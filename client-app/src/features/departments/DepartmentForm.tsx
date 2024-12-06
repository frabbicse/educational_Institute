import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { IDepartment } from "../../application/models/department";
import { RootStoreContext } from "../../stores/rootStore";
import { combineValidators, isRequired } from "revalidate";
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import TextInput from "../../common/form/TextInput";
import ErrorMessage from "../../common/form/ErrorMessage";

interface IProps {
  department: IDepartment | null;
}
const validate = combineValidators({
  name: isRequired("name"),
  code: isRequired("code"),
});

const DepartmentForm = () => {
  const rootStore = useContext(RootStoreContext);

  const { createDepartment, department } = rootStore.departmentStore;

  return (
    <FinalForm
      onSubmit={(values: IDepartment) =>
        createDepartment(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtyFieldsSinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Field component={TextInput} name="name" placeholder="name" value={department?.name} />
          <Field component={TextInput} name="code" placeholder="code" value={department?.code} />
          {submitError && !dirtyFieldsSinceLastSubmit && <ErrorMessage error={submitError} text="Enter name and code" />}
          <Button loading={submitting} floated="right" positive type="submit" content="Save" />
        </Form>
      )}
    />
  );
};
export default DepartmentForm;
