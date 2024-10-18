import DepartmentStore from "./departmentStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

configure({ enforceActions: 'always' });

export class RootStore {
    departmentStore!: DepartmentStore;
    userStore!: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;

    constructor() {
        this.departmentStore = new DepartmentStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());