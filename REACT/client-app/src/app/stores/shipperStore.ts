import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Shipper } from "../models/shipper";


export default class ShipperStore {
    shippers: Shipper[] = [];
    shipperRegistry = new Map<string, Shipper>();
    selectedShipper: Shipper | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    isused = false;
    pageCount = 1;

    constructor() {
        makeAutoObservable(this);
    }

    loadShipper = async (shipperName: string, page: number, pageSize: number) => {
        this.setLoadingInitial(true);
        try {
            const shippers = await agent.Shippers.list(shipperName, page, pageSize);
            this.shippers = shippers as Shipper[];
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createShipperName = async (shipper: Shipper) => {
        this.loading = true;
        try {
            await agent.Shippers.create(shipper);
            runInAction(() => {
                this.selectedShipper = shipper;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    updateShipper = async (shipper: Shipper) => {
        try {
            this.loading = true;
            await agent.Shippers.update(shipper);
            runInAction(() => {
                this.shipperRegistry.set(shipper.id, shipper);
                this.selectedShipper = shipper;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteShipper = async (id: string) => {
        this.loading = true;

        try {
            await agent.Shippers.delete(id);
            runInAction(() => {
                this.shipperRegistry.delete(id);
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadShippers = async (id: string) => {
        let shipper = this.getShipper(id);
        if (shipper) {
            this.selectedShipper = shipper;
            return shipper;
        }
        else {
            this.setLoadingInitial(true)
            try {
                shipper = await agent.Shippers.details(id);
                this.shipperRegistry.set(id, shipper);
                this.selectedShipper = shipper;
                this.setLoadingInitial(false);
                return shipper;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private getShipper = (id: string) => {
        return this.shipperRegistry.get(id);
    }
    isUsedShipper = async (id: string) => {
        this.loading = true;
        try {
            const checkIsused = await agent.Shippers.isUsed(id);
            runInAction(() => {
                this.isused = checkIsused as boolean;
                this.setLoadingInitial(true);
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                console.log(error);
                this.setLoadingInitial(false);
            });
        }
    }
    pageShipper = async (pageSize: number, searchTerm: string) => {
        this.loading = true;
        try {
            const page = await agent.Shippers.pagecount(pageSize, searchTerm);
            runInAction(() => {
                this.pageCount = page as number;
                this.setLoadingInitial(true);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                console.log(error);
                this.setLoadingInitial(false);
            });
        }
    }
}
