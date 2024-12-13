import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { IDesignation } from "../application/models/designation";
import agent from "../api/agent";

export default class DesignationStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }


    @observable designations: IDesignation[] = [];
    @observable loadingInitial = false;

    @computed get designationList() {
        return Array.from(this.designations.values());
    }

    @action loadDesignations = async () => {
        this.loadingInitial = true;
        try {
            const designations = await agent.Designation.list();

            runInAction(() => {
                designations.forEach(designation => {
                    this.designations.push(designation);

                })
            });

            this.loadingInitial = false;
        } catch (error) {
            throw error;
        }
    }
}