import { RootStore } from "./rootStore";
import { observable, action, reaction, makeObservable } from "mobx";

export default class CommonStore {
    rootStore: RootStore;
    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    @observable navigate: Function | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                }
                else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }


    @action setNavigate = (navigate: Function) => {
        this.navigate = navigate;
    }

    @action setToken = (token: string) => {
        if (this.token !== token) {
            this.token = token;
        }
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}