import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetail";
import EmployeeDashboard from "../../features/activities/dashboard/employeeDashboard";
import EmployeeForm from "../../features/activities/form/EmployeeForm";
import EmployeeDetail from "../../features/activities/details/EmployeeDetail";
import SupplierList from "../../features/activities/dashboard/SupplierList";
import SupplierDetail from "../../features/activities/details/SupplierDetail";
import SupplierForm from "../../features/activities/form/SupplierForm";
import ProductList from "../../features/activities/dashboard/productList";
import ProductDetail from "../../features/activities/details/ProductDetail";
import ProductForm from "../../features/activities/form/ProductForm";
import ShipperList from "../../features/activities/dashboard/shipperList";
import ShipperForm from "../../features/activities/form/ShipperForm";
import ShipperDetail from "../../features/activities/details/ShipperDetail";
import CustomerList from "../../features/activities/dashboard/customerList";
import CustomerDetail from "../../features/activities/details/CustomerDetail";
import CustomerForm from "../../features/activities/form/CustomerForm";
import Login from "../../features/activities/form/LoginForm";
import ShowShoppingCart from "../../features/activities/cart/showShoppingCart";
import OrderList from "../../features/activities/dashboard/orderList";
import OrderDetails from "../../features/activities/details/OrderDetail";
import Test from "../../features/activities/test/test";




export const routers: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: '/', element: <Login /> },
            { path: 'home', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'createActivities', element: <ActivityForm key='create' /> },
            { path: 'manage/:id', element: <ActivityForm key='manage' /> },

            { path: 'employee', element: <EmployeeDashboard /> },
            { path: 'createemployee', element: <EmployeeForm key='create' /> },
            { path: 'updateemployee/:id', element: <EmployeeForm key='update' /> },
            { path: 'employeeDetail/:id', element: <EmployeeDetail /> },

            { path: 'supplier', element: <SupplierList /> },
            { path: 'supplierDetail/:id', element: <SupplierDetail /> },
            { path: 'createSuplier', element: <SupplierForm key='create' /> },
            { path: 'updateSupplier/:id', element: <SupplierForm key='update' /> },

            { path: 'product', element: <ProductList /> },
            { path: 'productDetail/:id', element: <ProductDetail /> },
            { path: 'createProduct', element: <ProductForm key='create' /> },
            { path: 'updateProduct/:id', element: <ProductForm key='update' /> },

            { path: 'shipper', element: <ShipperList /> },
            { path: 'createShipper', element: <ShipperForm key='create' /> },
            { path: 'updateShipper/:id', element: <ShipperForm key='update' /> },
            { path: 'shipperDetail/:id', element: <ShipperDetail /> },

            { path: 'customer', element: <CustomerList /> },
            { path: 'customerDetail/:id', element: <CustomerDetail /> },
            { path: 'createCustomer', element: <CustomerForm key='create' /> },
            { path: 'updateCustomer/:id', element: <CustomerForm key='update' /> },

            { path: 'cart', element: <ShowShoppingCart /> },
            { path: 'order', element: <OrderList /> },
            { path: 'orderDetail/:id', element: <OrderDetails /> },

            { path: 'test', element: <Test /> },

        ]
    },
]

export const router = createBrowserRouter(routers);


