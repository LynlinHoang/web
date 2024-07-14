import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import ProductStore from "./productStore";
import SupplierStore from "./supplierStore";
import EmployeeStore from "./employeeStore";
import ShipperStore from "./shipperStore";
import ProvinceStore from "./provinceStore";
import CustomerStore from "./customerStore";
import AccountStore from "./accountStore";
import OrderStore from "./orderStore";
import DetailOrderStore from "./detailorderStore";
import CommonStore from "./commonStore";


interface Store {
    activityStore: ActivityStore;
    productStore: ProductStore;
    supplierStore: SupplierStore;
    employeeStore: EmployeeStore;
    shipperStore: ShipperStore;
    provinceStore: ProvinceStore;
    customerStore: CustomerStore;
    accountStore: AccountStore;
    orderStore: OrderStore;
    detailorderStore: DetailOrderStore;
    commonStore: CommonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    productStore: new ProductStore(),
    supplierStore: new SupplierStore(),
    employeeStore: new EmployeeStore(),
    shipperStore: new ShipperStore(),
    provinceStore: new ProvinceStore(),
    customerStore: new CustomerStore(),
    accountStore: new AccountStore(),
    orderStore: new OrderStore(),
    detailorderStore: new DetailOrderStore(),
    commonStore: new CommonStore(),
}

export const StoreContext = createContext(store);
export function useStore() {
    return useContext(StoreContext);
}