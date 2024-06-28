import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Login } from "../models/login";
import { Account } from "../models/account";
import { store } from "./store";
import { Token } from "../models/token";

export default class AccountStore {
    loading = false;
    loadingInitial = false;
    selectedAccount: Account | undefined = undefined;
    selectedJwt: Token | undefined = undefined;
    constructor() {
        makeAutoObservable(this);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loginaccount = async (login: Login) => {
        try {
            const email = login.userName;

            this.setLoadingInitial(true);
            const accecpt = await agent.Accounts.login(login)
            console.log(accecpt);


            if (accecpt) {
                this.selectedJwt = accecpt as Token;
                store.commonStore.setToken(this.selectedJwt.jwtToken);
                const account = await agent.Accounts.account(email);
                runInAction(() => {
                    this.selectedAccount = account as Account;
                    store.commonStore.setAccount(this.selectedAccount.userName);
                    store.commonStore.setId(this.selectedAccount.id);
                    store.commonStore.setPhoto(this.selectedAccount.photo);
                });
            }
            this.setLoadingInitial(false);
            return accecpt;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            throw error;
        }
    }
    logout = () => {
        this.selectedAccount = undefined;
        localStorage.clear();
        window.location.href = "/";

    }






}