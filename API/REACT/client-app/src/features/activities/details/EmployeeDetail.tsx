import React, { useEffect } from "react";
import { CardHeader, Button, Segment, FormField, Image } from 'semantic-ui-react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
export default observer(function EmployeeDetails() {
    const { employeeStore } = useStore();
    const navigate = useNavigate();
    const { selectedEmployee: employee, loadEmployees, deleteEmployee, isUsedEmployee, isused } = employeeStore;
    const { id } = useParams();
    function handleEmployeeDelete(id: string) {
        deleteEmployee(id).then(() => navigate(`/employee`));
        alert('Xóa thành công!');
    }

    useEffect(() => {
        if (id) {
            loadEmployees(id);
            isUsedEmployee(id);
        }
    }, [id, loadEmployees])
    if (!employee) return null;
    return (
        <>

            <Segment clearing color={"blue"}>
                <FormField>
                    <strong>Họ và Tên:</strong>
                    <CardHeader>{employee.fullName}</CardHeader>
                </FormField>
                <br />
                <FormField>
                    <strong>Ngày sinh:</strong>
                    <CardHeader>{employee.birthDate.toString()}</CardHeader>
                </FormField>
                <br />
                <FormField>
                    <strong>Địa chỉ:</strong>
                    <CardHeader>{employee.address}</CardHeader>
                </FormField>
                <br />
                <FormField>
                    <strong>Số điện thoại:</strong>
                    <CardHeader>{employee.phone}</CardHeader>
                </FormField>
                <br />
                <FormField>
                    <strong>Email:</strong>
                    <CardHeader>{employee.email}</CardHeader>
                </FormField>
                <br />
                <FormField>
                    <strong>Trạng thái:</strong>
                    {employee.isWorking === true ? (

                        <p>Đang làm việc</p>

                    ) : (

                        <p>Nghỉ việc</p>

                    )}
                </FormField>
                <br />
                <FormField>
                    <strong>Ảnh:</strong>
                    <Image src={employee.photo} size='tiny' />
                </FormField>
                {isused !== undefined &&
                    (!isused) && (
                        <Button floated="right" color='red' type="submit" content="Xóa" onClick={(e) => handleEmployeeDelete(employee.id)} />
                    )
                }
                <Button floated="right" type='button' content='Quay lại' as={Link} to={'/employee'} />
            </Segment>
        </>
    );
})
