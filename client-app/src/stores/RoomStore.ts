import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { IRoom } from "../application/models/room";
import agent from "../api/agent";

export default class RoomStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable rooms: IRoom[] = []

    @computed get roomList() {
        return Array.from(this.rooms.values());
    }

    @action loadRooms = async () => {
        try {
            const rooms = await agent.Room.list();
            console.log("rooms", rooms);


            runInAction(() => {
                rooms.forEach(room => {
                    this.rooms.push(room);
                })
            })
        } catch (error) {
            throw error;
        }
    }
}