import axios, { AxiosResponse } from "axios";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { Supplier } from "../models/supplier";
import { Employee } from "../models/employee";
import { Shipper } from "../models/shipper";
import { Customer } from "../models/customer";
import { ContentOrder } from "../models/contentorder";
import { Login } from "../models/login";
import { ProductOrderUpdate } from "../models/productorderupdate";
import { Order } from "../models/order";
import { OrderUpdate } from "../models/orderupdate";
import { store } from "../stores/store";

axios.defaults.baseURL = 'https://localhost:44309/api';
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})
const requests = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),

    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),

    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),

    del: <T>(url: string,) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
    list: (CategoryName: string, page: number, pageSize: number) => requests.get(`/categorie?filterOn=CategoryName&filterQuery=${CategoryName}&pageNumber=${page}&pageSize=${pageSize}`),
    details: (id: string) => requests.get<Category>(`/categorie/${id}`),
    create: (activity: Category) => axios.post('/categorie', activity),
    update: (activity: Category) => axios.put(`/categorie/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/categorie/${id}`),
    isUsed: (id: string) => requests.get(`/categorie/isUsed/${id}`),
    pagecount: (pageSize: number, searchTerm: string) => requests.get(`categorie/pageCount?pageSize=${pageSize}&filterQuery=${searchTerm}`),
}
const Products = {
    list: (ProductName: string, page: number, pageSize: number) => requests.get(`/product?filterOn=ProductName&filterQuery=${ProductName}&pageNumber=${page}&pageSize=${pageSize}`),
    details: (id: string) => requests.get<Product>(`/product/${id}`),
    create: (formData: FormData) => axios.post('/product', formData),
    update: (formData: FormData) => axios.put(`/product/${formData.get('id')}`, formData),
    delete: (id: string) => requests.del(`/product/${id}`),
    isUsed: (id: string) => requests.get(`/product/isUsed/${id}`),
    pagecount: (pageSize: number, searchTerm: string) => requests.get(`product/pageCount?pageSize=${pageSize}&filterQuery=${searchTerm}`),
}

const Suppliers = {
    list: (supplierName: string, page: number, pageSize: number) => requests.get(`/supplier?filterOn=supplierName&filterQuery=${supplierName}&pageNumber=${page}&pageSize=${pageSize}`),
    details: (id: string) => requests.get<Supplier>(`/supplier/${id}`),
    create: (employee: Supplier) => axios.post('/supplier', employee),
    update: (employee: Supplier) => axios.put(`/supplier/${employee.id}`, employee),
    delete: (id: string) => requests.del(`/supplier/${id}`),
    isUsed: (id: string) => requests.get(`/supplier/isUsed/${id}`),
    pagecount: (pageSize: number, searchTerm: string) => requests.get(`supplier/pageCount?pageSize=${pageSize}&filterQuery=${searchTerm}`),

}

const Employees = {
    list: (FullName: string, page: number, pageSize: number) => requests.get(`/employee?filterOn=fullName&filterQuery=${FullName}&pageNumber=${page}&pageSize=${pageSize}`),
    details: (id: string) => requests.get<Employee>(`/employee/${id}`),
    create: (formData: FormData) => axios.post('/employee', formData),
    update: (formData: FormData) => axios.put(`/employee/${formData.get('id')}`),
    delete: (id: string) => requests.del(`/employee/${id}`),
    isUsed: (id: string) => requests.get(`/employee/isUsed/${id}`),
    pagecount: (pageSize: number, searchTerm: string) => requests.get(`employee/pageCount?pageSize=${pageSize}&filterQuery=${searchTerm}`),
}

const Shippers = {
    list: (shipperName: string, page: number, pageSize: number) => requests.get(`/shipper?filterOn=shipperName&filterQuery=${shipperName}&pageNumber=${page}&pageSize=${pageSize}`),
    details: (id: string) => requests.get<Shipper>(`/shipper/${id}`),
    create: (shipper: Shipper) => axios.post('/shipper', shipper),
    update: (shipper: Shipper) => axios.put(`/shipper/${shipper.id}`, shipper),
    delete: (id: string) => requests.del(`/shipper/${id}`),
    isUsed: (id: string) => requests.get(`/shipper/isUsed/${id}`),
    pagecount: (pageSize: number, searchTerm: string) => requests.get(`shipper/pageCount?&pageSize=${pageSize}&filterQuery=${searchTerm}`),

}

const Customers = {
    list: (customerName: string, page: number, pageSize: number) => requests.get(`/customer?filterOn=customerName&filterQuery=${customerName}&pageNumber=${page}&pageSize=${pageSize}`),
    details: (id: string) => requests.get<Customer>(`/customer/${id}`),
    create: (customer: Customer) => axios.post('/customer', customer),
    update: (customer: Customer) => axios.put(`/customer/${customer.id}`, customer),
    delete: (id: string) => requests.del(`/customer/${id}`),
    isUsed: (id: string) => requests.get(`/customer/isUsed/${id}`),
    pagecount: (pageSize: number, searchTerm: string) => requests.get(`customer/pageCount?pageSize=${pageSize}&filterQuery=${searchTerm}`),
}
const Provinces = {
    list: () => requests.get('/province'),
}
const Accounts = {
    login: (login: Login) => requests.post('auth/Login', login),
    account: (email: string) => requests.get(`/account/${email}`),
}

const Orders = {
    list: (status: number, fromTime: string, toTime: string, searchOrder: string, page: number, pageSize: number) => requests.get(`/order?&filterOnStatus=statusID&filterQueryStatus=${status}&fromTime=${fromTime}&toTime=${toTime}&filterOn=customerName&filterQuery=${searchOrder}&pageNumber=${page}&pageSize=${pageSize}`),
    create: (order: Order) => axios.post('/order', order),
    details: (id: string) => requests.get<ContentOrder>(`/order/${id}`),
    delete: (id: string) => requests.del(`/order/${id}`),
    update: (orderupdate: OrderUpdate) => axios.put(`/order/${orderupdate.id}`, orderupdate),
    listcreate: () => requests.get(`/order`),
    pagecount: (status: number, fromTime: string, toTime: string, searchOrder: string, pageSize: number) => requests.get(`order/pageCount?filterQuery=${searchOrder}&fromTime=${fromTime}&toTime=${toTime}&pageSize=${pageSize}&filterQueryStatus=${status}`),

}

const DetailOrders = {
    list: (id: string) => requests.get(`/detailorder/${id}`),
    update: (productorderupdate: ProductOrderUpdate) => axios.put(`/detailorder/${productorderupdate.id}`, productorderupdate),
    delete: (id: string) => requests.del(`/detailorder/${id}`),
    count: (id: string) => requests.get(`detailorder/count/${id}`),
}

const agent = {
    Activities,
    Products,
    Suppliers,
    Employees,
    Shippers,
    Provinces,
    Customers,
    Accounts,
    Orders,
    DetailOrders
}

export default agent;
