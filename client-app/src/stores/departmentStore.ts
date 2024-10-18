import { observable, action, configure, runInAction } from 'mobx';
import { IDepartment } from '../application/models/department';
import { SyntheticEvent } from 'react';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({ enforceActions: 'always' });

export default class DepartmentStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable departmentRegistry = new Map();
    @observable departments: IDepartment[] = [];
    @observable department: IDepartment | undefined;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @action loadDepartments = async () => {
        this.loadingInitial = true;
        try {
            const departments = await agent.Departments.list();
            console.log(departments);
            departments.forEach(department => {
                this.departments.push(department)

                //this.departmentRegistry.set(department.id, department);
            })
            this.loadingInitial = false;
        } catch (error) {
            // this.loadingInitial = true;
            throw error;
            //console.log(error);
        }
    }

    @action createDepartment = async (department: IDepartment) => {

        try {
            this.submitting = true;
            await agent.Departments.create(department);
            this.departments.push(department);
            //this.departmentRegistry.set(department.id, department!);
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            throw error;
            //console.log(error);
        }
    }

    @action editDepartment = async (department: IDepartment) => {
        this.submitting = true;

        try {
            agent.Departments.update(department);
            this.departmentRegistry.set(department.id, department);
            this.department = department;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            throw error;
            //console.log(error);
        }
    }

    @action deleteDepartment = async (event: SyntheticEvent<HTMLButtonElement>, id: number) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Departments.delete(id);
            this.departmentRegistry.delete(id);
            this.submitting = false;
            this.target = '';
        } catch (error) {
            this.submitting = false;
            this.target = '';
            throw error;
            //console.log(error);
        }

    }

    @action loadEditForm = async (id: number) => {
        //this.selectedDepartment = this.departmentRegistry.get(id);

        let department = this.getSelectedDepartment(id);

        if (department) {
            this.department = department
        }
        else {
            this.loadingInitial = true;
            try {
                department = await agent.Departments.detail(id);
                runInAction('getting department', () => {
                    this.department = department;
                    this.loadingInitial = false
                })
            }
            catch (error) {
                runInAction('get activity error', () => {
                    this.loadingInitial = false
                });
                throw error;
                //console.log(error);
            }
        }
        //console.log(this.selectedDepartment);
    }
    getSelectedDepartment = (id: number) => {
        ///this.selectedDepartment = this.departmentRegistry.get(id);
        return this.departmentRegistry.get(id);
    }
}

