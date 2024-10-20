import { observable, action, computed, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../application/models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { useNavigate } from "react-router";
// import { history } from "..";
export default class UserStore {
     rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user }

    @action login = async (values: IUserFormValues) => {
        try {
            const navigate = useNavigate();
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            });
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            navigate('/dashboard');
        } catch (error) {
            throw error;
        }
    }

    @action register = async (values: IUserFormValues) => {
        try {
            const navigate = useNavigate();
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            navigate('/dashboard');
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
        const navigate = useNavigate();
        this.rootStore.commonStore.setToken(null!);
        this.user = null;
        navigate('/');
    }
}