import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ProductOrder } from "../models/productorder";
import { ProductOrderUpdate } from "../models/productorderupdate";


export default class DetailOrderStore {
    orderdetails: ProductOrder[] = [];
    orderdetailRegistry = new Map<string, ProductOrder>();
    editMode = false;
    loading = false;
    loadingInitial = false;
    countDetail = 1;

    constructor() {
        makeAutoObservable(this);
    }

    loadorderdetail = async (id: string) => {
        this.setLoadingInitial(true);
        try {
            const orderdetails = await agent.DetailOrders.list(id);
            this.orderdetails = orderdetails as ProductOrder[];
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    updateDetail = async (productorderupdate: ProductOrderUpdate) => {
        try {

            this.loading = true;
            console.log(productorderupdate);
            await agent.DetailOrders.update(productorderupdate);
            runInAction(() => {
                const index = this.orderdetails.findIndex(order => order.id === productorderupdate.id);
                if (index > -1) {
                    this.orderdetails[index] = { ...this.orderdetails[index], ...productorderupdate };
                }
                this.orderdetailRegistry.set(productorderupdate.id, {
                    ...this.orderdetailRegistry.get(productorderupdate.id),
                    ...productorderupdate
                } as ProductOrder);
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

    deleteorderdetail = async (id: string) => {
        this.loading = true;
        try {
            console.log(id);
            await agent.DetailOrders.delete(id);
            const count = await agent.DetailOrders.count(id);
            runInAction(() => {
                this.countDetail = count as number;
                this.orderdetails = this.orderdetails.filter(order => order.id !== id);
                this.orderdetailRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    getCount = async (id: string) => {
        this.loading = true;

        try {
            console.log(id);
            const count = await agent.DetailOrders.count(id);
            runInAction(() => {
                this.countDetail = count as number;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }




}
