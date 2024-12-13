import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { ITeacher } from "../application/models/teacher";
import agent from "../api/agent";

export default class TeacherStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable teachers: ITeacher[] = [];
    @observable loadingInitial = false;
    @observable submitting = false;

    @computed get teacherList() {
        return Array.from(this.teachers.values());
    }

    @action loadTeachers = async () => {
        this.loadingInitial = true;
        try {
            const teachers = await agent.Teacher.list();

            runInAction(() => {
                teachers.forEach(teacher => {
                    this.teachers.push(teacher);
                })
            });
            this.loadingInitial = false;
        } catch (error) {
            throw error;
        }
    }

    @action createTeacher = async (teacher: ITeacher) => {
        try {
            this.submitting = true;
            await agent.Teacher.create(teacher);
            this.teachers.push(teacher);

            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            throw error;
        }
    }

}