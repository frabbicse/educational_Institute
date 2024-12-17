import { observable, action, computed, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../application/models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { createBrowserHistory } from 'history';
import { jwtDecode, JwtPayload } from "jwt-decode";
export const history = createBrowserHistory();

export default class UserStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            });
            this.rootStore.commonStore.setToken(user.token);

            if (this.rootStore.commonStore.navigate) {
                this.rootStore.commonStore.navigate('/dashboard');
            }

        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    @action register = async (values: IUserFormValues) => {
        try {

            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            if (this.rootStore.commonStore.navigate) {
                this.rootStore.commonStore.navigate('/dashboard');
            }
        }
        catch (error) {
            throw error;
        }
    }

    @action getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error);
        }
    }

    @action logout = () => {

        this.rootStore.commonStore.setToken(null!);
        this.user = null;
        if (this.rootStore.commonStore.navigate) {
            this.rootStore.commonStore.navigate('/');
        }
    }

    @action loginState = async () => {
        try {
            var token = window.localStorage.getItem("jwt");
            const currentPath = window.location.pathname + window.location.search;
            if (token) {
                let decoded: any = jwtDecode<JwtPayload>(token);

                const nameId = decoded.nameid;
                const user = await agent.User.currentState(nameId);
                user.token = token
                if (user) {
                    runInAction(() => {
                        this.user = user;
                        if (this.rootStore.commonStore.navigate) {
                            if (currentPath !== "/login") {
                                this.rootStore.commonStore.navigate(currentPath);
                            } else {
                                this.rootStore.commonStore.navigate("/dashboard");
                            }
                        }
                    })
                }
            }

        } catch (error) {

        }
    }
}

