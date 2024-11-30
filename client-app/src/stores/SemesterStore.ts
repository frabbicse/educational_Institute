import { action, configure, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { ISemester } from "../application/models/semester";
import agent from "../api/agent";

configure({ enforceActions: 'always' });

export default class SemesterStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable semesterList: ISemester[] = [];
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @action loadSemesters = async () => {
        this.loadingInitial = true;
        try {
            const semesters = await agent.Semester.list();

            runInAction(() => {
                semesters.forEach((semester: ISemester) => {
                    this.semesterList.push(semester);
                })
            });
            this.loadingInitial = false;

        } catch (error) {
            // this.loadingInitial = true;
            throw error;
            //console.log(error);
        }
    }

}