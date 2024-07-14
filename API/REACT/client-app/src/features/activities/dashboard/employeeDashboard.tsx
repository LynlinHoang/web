import React from "react";
import { observer } from "mobx-react-lite";
import EmployeeList from "./EmployeeList";


export default observer(function EmployeeDashboard() {


    return (
        <EmployeeList />
    );
})
