import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../common/form/TextInput';
import { RootStoreContext } from '../../stores/rootStore';
import { IUserFormValues } from '../../application/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../common/form/ErrorMessage';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

const LoginForm = () => {

    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Login to Institute' color='teal' textAlign='center' />
                    <Field name='email' component={TextInput} placeholder='Email' />
                    <Field name='password' component={TextInput} placeholder='password' type='password' />

                    {(submitError && !dirtySinceLastSubmit) &&
                        (<ErrorMessage error={submitError} text='Invalid username or password' />)}
                    <br />
                    <Button
                        color='teal'
                        content='Login'
                        loading={submitting} disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        fluid ></Button>
                    {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
                </Form>
            )}
        />
    );
};

export default LoginForm;