import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { ICourse } from "../application/models/course";
import agent from "../api/agent";

export default class CourseStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable courseRegistry = new Map();
    @observable courses: ICourse[] = [];
    @observable course: ICourse | undefined;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get courseList() {
        return Array.from(this.courses.values());
    }

    @action loadCourses = async () => {
        try {
            this.loadingInitial = true;
            const courses = await agent.Course.list();
            runInAction(() => {
                courses.forEach((course) => {
                    this.courses.push(course);

                })
            });
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial = false;
            throw error;
        }
    }

    @action createCourse = async (course: ICourse) => {
        try {
            this.submitting = true;
            console.log("course", course);

            // await agent.Course.create(course);
            this.courses.push(course);
            this.submitting = false
        } catch (error) {
            this.submitting = false;
            throw error;
        }
    }
}