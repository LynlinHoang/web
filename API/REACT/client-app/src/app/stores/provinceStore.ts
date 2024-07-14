import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Province } from "../models/province";



export default class ProvinceStore {

    provinces: Province[] = [];
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }
    loadProvince = async () => {
        this.setLoadingInitial(true);
        try {
            const provinces = await agent.Provinces.list();
            this.provinces = provinces as Province[];
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}
