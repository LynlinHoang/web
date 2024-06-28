import { makeAutoObservable, runInAction } from "mobx";
import { format } from 'date-fns';
import { Employee } from "../models/employee";
import agent from "../api/agent";
import { EmployeeAppUpdate } from "../models/employeeAddUpdate";

export default class EmployeeStore {
    employees: Employee[] = [];
    loadingInitial = false;
    employeeRegistry = new Map<string, Employee>();
    selectedEmployee: Employee | undefined = undefined;
    editMode = false;
    loading = false;
    errorStore = false;
    isused = false;
    pageCount = 1;

    constructor() {
        makeAutoObservable(this);
    }

    loadEmployee = async (FullName: string, page: number, pageSize: number) => {
        this.setLoadingInitial(true);
        try {
            const employees = await agent.Employees.list(FullName, page, pageSize);
            this.employees = employees as Employee[];
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            this.errorStore = true;
        }
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }



    createEmployee = async (employeeAddUpdateAdd: EmployeeAppUpdate) => {
        this.loading = true;
        try {
            const formattedDate = format(employeeAddUpdateAdd.birthDate, "yyyy-MM-dd'T'HH:mm:ss");
            // console.log(formattedDate);
            // console.log(employeeAddUpdateAdd);
            const formData = new FormData();
            formData.append('id', employeeAddUpdateAdd.id);
            formData.append('fullName', employeeAddUpdateAdd.fullName);
            formData.append('birthDate', formattedDate);
            formData.append('address', employeeAddUpdateAdd.address);
            formData.append('phone', employeeAddUpdateAdd.phone);
            formData.append('uploadFile', employeeAddUpdateAdd.uploadFile);
            formData.append('email', employeeAddUpdateAdd.email);
            formData.append('isWorking', employeeAddUpdateAdd.isWorking.toString());
            console.log('FormData:', formData);
            await agent.Employees.create(formData);
            runInAction(() => {
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

    updateEmployee = async (employeeAddUpdateAdd: EmployeeAppUpdate) => {
        try {
            this.loading = true;
            const formattedDate = format(employeeAddUpdateAdd.birthDate, "yyyy-MM-dd'T'HH:mm:ss");
            const formData = new FormData();
            formData.append('id', employeeAddUpdateAdd.id);
            formData.append('fullName', employeeAddUpdateAdd.fullName);
            formData.append('birthDate', formattedDate);
            formData.append('address', employeeAddUpdateAdd.address);
            formData.append('phone', employeeAddUpdateAdd.phone);
            formData.append('uploadFile', employeeAddUpdateAdd.uploadFile);
            formData.append('email', employeeAddUpdateAdd.email);
            formData.append('isWorking', employeeAddUpdateAdd.isWorking.toString());
            await agent.Employees.update(formData);
            let employee = await agent.Employees.details(employeeAddUpdateAdd.id);
            runInAction(() => {
                this.employeeRegistry.set(employeeAddUpdateAdd.id, employee);
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

    deleteEmployee = async (id: string) => {
        this.loading = true;
        try {
            await agent.Employees.delete(id);
            runInAction(() => {
                this.employeeRegistry.delete(id);
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadEmployees = async (id: string) => {
        let employee = this.getEmployee(id);
        if (employee) {
            this.selectedEmployee = employee;
            return employee;
        }
        else {
            this.setLoadingInitial(true)
            try {
                console.log(id);
                employee = await agent.Employees.details(id);
                this.employeeRegistry.set(id, employee);
                this.selectedEmployee = employee;
                this.setLoadingInitial(false);
                return employee;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }

    }
    private getEmployee = (id: string) => {
        return this.employeeRegistry.get(id);
    }
    isUsedEmployee = async (id: string) => {
        this.loading = true;
        try {
            const checkIsused = await agent.Employees.isUsed(id);
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
    pageEmployee = async (pageSize: number, searchTerm: string) => {
        this.loading = true;
        try {
            const page = await agent.Employees.pagecount(pageSize, searchTerm);
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
