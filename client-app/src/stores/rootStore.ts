import DepartmentStore from "./departmentStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import CourseStore from "./courseStore";
import SemesterStore from "./SemesterStore";
import TeacherStore from "./teacherStore";
import DesignationStore from "./designationStore";

configure({ enforceActions: 'always' });

export class RootStore {
    departmentStore!: DepartmentStore;
    userStore!: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    courseStore: CourseStore;
    semesterStore: SemesterStore;
    designationStore: DesignationStore;
    teacherStore: TeacherStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.departmentStore = new DepartmentStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.courseStore = new CourseStore(this);
        this.semesterStore = new SemesterStore(this);
        this.designationStore = new DesignationStore(this);
        this.teacherStore = new TeacherStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());