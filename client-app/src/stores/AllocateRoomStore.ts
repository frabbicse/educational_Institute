import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { IAllocateRoom } from "../application/models/allocateRoom";
import agent from "../api/agent";

export default class AllocateRoomStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable allocateRooms: IAllocateRoom[] = [];
    @observable allocateRoom: IAllocateRoom | undefined;

    @observable loadingInitital = false;
    @observable submitting = false;
    @observable target = '';

    @computed get allocatedRoomList() {
        return Array.from(this.allocateRooms.values());
    }

    @action loadingAllocateRooms = async () => {
        this.loadingInitital = true;
        try {
            const allocateRooms = await agent.AllocateRoom.list();

            runInAction(() => {
                allocateRooms.forEach(allocate => {
                    this.allocateRooms.push(allocate);
                });
            });

        } catch (error) {
            this.loadingInitital = true;
            throw error;
        }
    }

    @action createAllocateRoom = async (rooms: IAllocateRoom) => {
        try {
            this.submitting = true;
            await agent.AllocateRoom.create(rooms);
            this.allocateRooms.push(rooms);
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            throw error;
        }
    }
}