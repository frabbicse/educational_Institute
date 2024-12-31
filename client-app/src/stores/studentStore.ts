import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { IStudent } from "../application/models/student";
import agent from "../api/agent";
import { log } from "console";

export default class StudentStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }


    @observable students: IStudent[] = [];
    @observable student: IStudent | undefined;
    @observable loadingInital = false;
    @observable submitting = false;

    @computed get studentList() {
        return Array.from(this.students.values());
    }

    @action loadStudents = async () => {
        this.loadingInital = true
        try {
            const students = await agent.Student.list();
            runInAction(() => {
                students.forEach((student) => {
                    this.students.push(student);

                })
            })

            this.loadingInital = false;
        } catch (error) {
            this.loadingInital = false;
            throw error;

        }
    }

    @action createStudent = async (student: IStudent) => {
        try {
            this.submitting = true

            await agent.Student.create(student);
            this.students.push(student);
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            throw error;

        }
    }

}