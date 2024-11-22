import { action, observable } from "mobx";
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

    @action createCourse = async (course: ICourse) => {
        try {
            this.submitting = true;
            await agent.Course.create(course);
            this.courses.push(course);
            this.submitting = false
        } catch (error) {
            this.submitting = false;
            throw error;
        }
    }
}