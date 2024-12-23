import { action, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { ICourseAssignToTeacher } from "../application/models/courseAssign";
import agent from "../api/agent";

export default class CourseAssignToTeacher {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable assignedCourseList: ICourseAssignToTeacher[] = [];
    @observable courseAssign: ICourseAssignToTeacher | undefined;
    @observable loadingInitial = false;
    @observable submitting = false;


    @action loadAssignedCourseList = async () => {
        this.loadingInitial = true;
        try {
            const assignedCourse = await agent.CourseAssignToTeacher.list();
            runInAction(() => {
                assignedCourse.forEach(course => {
                    this.assignedCourseList.push(course);

                })
            });
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial = false;
            throw error;
        }
    }


    @action assignCourseToTeacher = async (assignCourse: ICourseAssignToTeacher) => {
        try {
            this.submitting = true;
            await agent.CourseAssignToTeacher.create(assignCourse);
            this.assignedCourseList.push(assignCourse);

            this.submitting = false
        } catch (error) {
            throw error;
        }
    }
}