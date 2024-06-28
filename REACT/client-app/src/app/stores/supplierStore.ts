import { makeAutoObservable, runInAction } from "mobx";
import { Supplier } from "../models/supplier";
import agent from "../api/agent";
import { Province } from "../models/province";


export default class SupplierStore {
    suppliers: Supplier[] = [];
    provinces: Province[] = [];
    supplierRegistry = new Map<string, Supplier>();
    selectedSupplier: Supplier | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    isused = false;
    pageCount = 1;

    constructor() {
        makeAutoObservable(this);
    }

    loadSupplier = async (SupplierName: string, page: number, pageSize: number) => {
        this.setLoadingInitial(true);
        try {
            const suppliers = await agent.Suppliers.list(SupplierName, page, pageSize);
            this.suppliers = suppliers as Supplier[];
            this.setLoadingInitial(false);


        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };



    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createSupplier = async (supplier: Supplier) => {
        this.loading = true;
        try {
            await agent.Suppliers.create(supplier);
            runInAction(() => {
                this.supplierRegistry.set(supplier.id, supplier);
                this.selectedSupplier = supplier;
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
    updateSupplier = async (supplier: Supplier) => {
        try {
            this.loading = true;
            await agent.Suppliers.update(supplier);
            runInAction(() => {
                this.supplierRegistry.set(supplier.id, supplier);
                this.selectedSupplier = supplier;
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

    deleteSupplier = async (id: string) => {
        this.loading = true;

        try {
            await agent.Suppliers.delete(id);
            runInAction(() => {
                this.supplierRegistry.delete(id);
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadSuppliers = async (id: string) => {
        let supplier = this.getSupplier(id);
        if (supplier) {
            this.selectedSupplier = supplier;
            return supplier;
        }
        else {
            this.setLoadingInitial(true)
            try {
                supplier = await agent.Suppliers.details(id);
                this.supplierRegistry.set(id, supplier);
                this.selectedSupplier = supplier;
                this.setLoadingInitial(false);
                return supplier;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private getSupplier = (id: string) => {
        return this.supplierRegistry.get(id);
    }
    isUsedSupplier = async (id: string) => {
        this.loading = true;
        try {
            const checkIsused = await agent.Suppliers.isUsed(id);
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
    pageSupplier = async (pageSize: number, searchTerm: string) => {
        this.loading = true;
        try {
            const page = await agent.Suppliers.pagecount(pageSize, searchTerm);
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
