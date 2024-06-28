import React, { useEffect } from "react";
import { CardHeader, Button, Segment, FormField, } from 'semantic-ui-react';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams, useNavigate } from "react-router-dom";
export default observer(function CustomerDetails() {
    const navigate = useNavigate();
    const { customerStore } = useStore();
    const { selectedCustomer: customer, loadCustomers, deleteCustomer, isUsedCustomer, isused } = customerStore;
    const { id } = useParams();
    function handleSupplierDelete(id: string) {
        deleteCustomer(id).then(() => navigate(`/supplier`));
    }

    useEffect(() => {
        if (id) {
            loadCustomers(id);
            isUsedCustomer(id);
        }
    }, [id, loadCustomers])
    if (!customer) return null;

    console.log(customer);
    return (
        <>

            <Segment clearing color={"blue"}>
                <FormField>
                    <strong>Tên nhà cung cấp:</strong>
                </FormField>
                <CardHeader>{customer.customerName}</CardHeader>
                <br />
                <FormField>
                    <strong>Tên giao dịch:</strong>
                </FormField>
                <CardHeader>{customer.contactName}</CardHeader>
                <br />
                <FormField>
                    <strong>Điện thoại:</strong>
                </FormField>
                <CardHeader>{customer.phone}</CardHeader>
                <br />
                <FormField>
                    <strong>Gmail:</strong>
                </FormField>
                <CardHeader>{customer.email}</CardHeader>
                <br />
                <FormField>
                    <strong>Địa chỉ:</strong>
                </FormField>
                <CardHeader>{customer.address}</CardHeader>
                <br />
                <FormField>
                    <strong>Tỉnh thành:</strong>
                </FormField>
                <CardHeader>{customer.province}</CardHeader>
                <br />
                <FormField>
                    <strong>Trạng thái:</strong>
                    {customer.isLocked === true ? (

                        <p>Tài khoản đang hoạt động</p>

                    ) : (

                        <p>Tài khoản không hoạt động</p>

                    )}
                </FormField>
                {isused !== undefined &&
                    (!isused) && (
                        <Button floated="right" color='red' type="submit" content="Xóa" onClick={(e) => handleSupplierDelete(customer.id)} />
                    )
                }
                <Button as={Link} to={'/customer'} floated="right" type='button' content='Quay lại' />
            </Segment>
        </>
    );
})