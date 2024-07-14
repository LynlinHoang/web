import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Customer } from "../models/customer";


export default class CustomerStore {
    customers: Customer[] = [];
    customersRegistry = new Map<string, Customer>();
    selectedCustomer: Customer | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    isused = false;
    pageCount = 1;
    constructor() {
        makeAutoObservable(this);
    }

    loadCustomer = async (shipperName: string, page: number, pageSize: number) => {
        this.setLoadingInitial(true);
        try {
            const shippers = await agent.Customers.list(shipperName, page, pageSize);
            this.customers = shippers as Customer[];
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createCustomer = async (customer: Customer) => {
        this.loading = true;
        try {
            await agent.Customers.create(customer);
            runInAction(() => {
                this.selectedCustomer = customer;
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

    updateCustomer = async (customer: Customer) => {
        try {
            this.loading = true;
            await agent.Customers.update(customer);
            console.log(customer);
            runInAction(() => {
                this.customersRegistry.set(customer.id, customer);
                this.selectedCustomer = customer;
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

    deleteCustomer = async (id: string) => {
        this.loading = true;

        try {
            await agent.Customers.delete(id);
            runInAction(() => {
                this.customersRegistry.delete(id);
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    loadCustomers = async (id: string) => {
        let customer = this.getCustomer(id);
        if (customer) {
            this.selectedCustomer = customer;
            return customer;
        }
        else {
            this.setLoadingInitial(true)
            try {
                customer = await agent.Customers.details(id);
                this.customersRegistry.set(id, customer);
                this.selectedCustomer = customer;
                this.setLoadingInitial(false);
                return customer;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private getCustomer = (id: string) => {
        return this.customersRegistry.get(id);
    }
    isUsedCustomer = async (id: string) => {
        this.loading = true;
        try {
            const checkIsused = await agent.Customers.isUsed(id);
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
    pageCustomer = async (pageSize: number, searchTerm: string) => {
        this.loading = true;
        try {
            const page = await agent.Customers.pagecount(pageSize, searchTerm);
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
