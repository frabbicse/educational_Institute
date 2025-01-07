import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { IDay } from "../application/models/day";
import agent from "../api/agent";

export default class DayStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable days: IDay[] = [];

    @computed get dayList() {
        return Array.from(this.days.values());
    }

    @action loadDays = async () => {
        try {
            const days = await agent.Day.list();

            runInAction(() => {
                days.forEach((day) => {
                    this.days.push(day);
                })
            })
        } catch (error) {
            throw error;
        }
    }
}