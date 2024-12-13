import { action, computed, configure, observable, runInAction } from "mobx";
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

    @computed get semesters() {
        return Array.from(this.semesterList.values());
    }

    @action loadSemesters = async () => {
        this.loadingInitial = true;
        try {
            const semesters = await agent.Semester.list();
            console.log("semes", semesters);


            runInAction(() => {
                semesters.forEach(semester => {
                    this.semesterList.push(semester);
                })
            });
            this.loadingInitial = false;

        } catch (error) {
            this.loadingInitial = false;
            throw error;
            //console.log(error);
        }
    }

    @action createSemester = async (semester: ISemester) => {
        try {
            this.submitting = true;
            await agent.Semester.create(semester);
            this.semesterList.push(semester);
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            throw error;
        }
    }

}