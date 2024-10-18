import React, { useState, ChangeEvent, useContext } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';
import { IDepartment } from '../../application/models/department';
import { RootStoreContext } from '../../stores/rootStore';

interface IProps {
    department: IDepartment | null;
}

const DepartmentForm: React.FC<IProps> = ({ department: initFormState }) => {

    const rootStore = useContext(RootStoreContext);


    const { createDepartment, editDepartment } = rootStore.departmentStore;
    const initial = () => {
        if (initFormState) {
            return initFormState;
        }
        else {
            return {
                id: 0,
                name: '',
                code: ''
            };
        }
    };

    const [departmentt, setDepartment] = useState<IDepartment>(initial);

    const handleSubmit = (e: any) => {
        if (departmentt.id === 0) {
            let newDepartment = {
                ...departmentt
            }
            createDepartment(newDepartment);
        }
        else {
            editDepartment(departmentt);
        }
        setDepartment(initial)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDepartment({ ...departmentt, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    onChange={handleInputChange}
                    name='name'
                    placeholder='name'
                    value={departmentt.name} />
                <Form.Input
                    onChange={handleInputChange}
                    name='code'
                    placeholder='code'
                    value={departmentt.code} />
                <Button loading={rootStore.departmentStore.submitting} floated='right' positive type='submit' content='Save' />

            </Form>
        </Segment>
    )
}
export default DepartmentForm;