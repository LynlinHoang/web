import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Order } from "../models/order";
import { format } from 'date-fns';
import { ContentOrder } from "../models/contentorder";
import { OrderUpdate } from "../models/orderupdate";

const convertEmptyStringsToNull = (obj: any) => {
    Object.keys(obj).forEach(key => {
        if (obj[key] === "") {
            obj[key] = null;
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item: any) => convertEmptyStringsToNull(item));
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            convertEmptyStringsToNull(obj[key]);
        }
    });
};

export default class OrderStore {
    contentOrders: ContentOrder[] = [];
    selectedOrder: ContentOrder | undefined = undefined;
    contentorderRegistry = new Map<string, ContentOrder>();
    editMode = false;
    loading = false;
    loadingInitial = false;
    getOrderCreat: Order | undefined = undefined;
    pageCount = 1;
    constructor() {
        makeAutoObservable(this);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createOrder = async (order: Order) => {
        const currentTime = new Date();
        const orderTime = format(currentTime, "yyyy-MM-dd'T'HH:mm:ss");
        order.orderTime = orderTime;
        convertEmptyStringsToNull(order);

        this.loading = true;
        try {

            const createdOrder = await agent.Orders.create(order);
            console.log(order);
            const listcreateOrder = await agent.Orders.listcreate();
            runInAction(() => {
                this.contentOrders = listcreateOrder as ContentOrder[];
                this.getOrderCreat = createdOrder.data
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
    loadOrder = async (status: number, fromDate: Date, toDate: Date, searchOrder: string, page: number, pageSize: number) => {
        this.setLoadingInitial(true);
        try {
            const setfromDate = format(fromDate, "MM-dd-yyyy");
            const settoDate = format(toDate, "MM-dd-yyyy");
            //console.log(searchOrder);
            const contentOrders = await agent.Orders.list(status, setfromDate, settoDate, searchOrder, page, pageSize);
            this.contentOrders = contentOrders as ContentOrder[];

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };
    loadContentOrder = async (id: string) => {
        let contentorder = this.getcontentorder(id);
        if (contentorder) {
            this.selectedOrder = contentorder;
            return contentorder;
        }
        else {
            this.setLoadingInitial(true)
            try {
                contentorder = await agent.Orders.details(id);
                this.contentorderRegistry.set(id, contentorder);
                this.selectedOrder = contentorder;
                this.setLoadingInitial(false);
                return contentorder;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }

    }
    updateAccept = async (orderupdate: OrderUpdate, id: string) => {
        try {
            this.loading = true;
            const currentTime = new Date();
            const acceptTime = format(currentTime, "yyyy-MM-dd'T'HH:mm:ss");
            orderupdate.acceptTime = acceptTime;
            orderupdate.statusID = 2;
            convertEmptyStringsToNull(orderupdate);
            console.log(orderupdate);
            await agent.Orders.update(orderupdate);
            const contentorder = await agent.Orders.details(id);
            runInAction(() => {

                this.selectedOrder = contentorder;
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
    updateFinished = async (orderupdate: OrderUpdate, id: string) => {
        try {
            this.loading = true;
            const currentTime = new Date();
            const finishedTime = format(currentTime, "yyyy-MM-dd'T'HH:mm:ss");
            orderupdate.finishedTime = finishedTime;
            orderupdate.statusID = 4;
            convertEmptyStringsToNull(orderupdate);
            console.log(orderupdate);
            await agent.Orders.update(orderupdate);
            const contentorder = await agent.Orders.details(id);
            runInAction(() => {

                this.selectedOrder = contentorder;
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
    updateShipper = async (orderupdate: OrderUpdate, id: string) => {
        try {
            this.loading = true;
            const currentTime = new Date();
            const shipperTime = format(currentTime, "yyyy-MM-dd'T'HH:mm:ss");
            orderupdate.statusID = 3;
            orderupdate.shippedTime = shipperTime
            convertEmptyStringsToNull(orderupdate);
            console.log(orderupdate);
            await agent.Orders.update(orderupdate);
            const contentorder = await agent.Orders.details(id);
            runInAction(() => {
                this.selectedOrder = contentorder;
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
    updateRefuse = async (orderupdate: OrderUpdate, id: string) => {
        try {
            this.loading = true;
            orderupdate.statusID = 5;
            convertEmptyStringsToNull(orderupdate);
            console.log(orderupdate);
            await agent.Orders.update(orderupdate);
            const contentorder = await agent.Orders.details(id);
            runInAction(() => {
                this.selectedOrder = contentorder;
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
    updateCancel = async (orderupdate: OrderUpdate, id: string) => {
        try {
            this.loading = true;
            orderupdate.statusID = 6;
            convertEmptyStringsToNull(orderupdate);
            console.log(orderupdate);
            await agent.Orders.update(orderupdate);
            const contentorder = await agent.Orders.details(id);
            runInAction(() => {
                this.selectedOrder = contentorder;
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


    private getcontentorder = (id: string) => {
        return this.contentorderRegistry.get(id);
    }

    deleteOrder = async (id: string) => {
        this.loading = true;

        try {
            await agent.Orders.delete(id);
            runInAction(() => {
                this.contentorderRegistry.delete(id);
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    pageOrder = async (status: number, fromTime: Date, toTime: Date, searchOrder: string, pageSize: number) => {
        this.loading = true;
        try {
            const setfromDate = format(fromTime, "MM-dd-yyyy");
            const settoDate = format(toTime, "MM-dd-yyyy");
            const page = await agent.Orders.pagecount(status, setfromDate, settoDate, searchOrder, pageSize);
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
