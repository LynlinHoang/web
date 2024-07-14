import React, { useEffect } from "react";
import { CardHeader, Button, Segment, FormField, } from 'semantic-ui-react';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams, useNavigate } from "react-router-dom";
export default observer(function SupplierDetails() {
    const navigate = useNavigate();
    const { supplierStore } = useStore();
    const { selectedSupplier: supplier, loadSuppliers, deleteSupplier, isUsedSupplier, isused } = supplierStore;
    const { id } = useParams();
    function handleSupplierDelete(id: string) {
        deleteSupplier(id).then(() => navigate(`/supplier`));
    }
    useEffect(() => {
        if (id) {
            loadSuppliers(id);
            isUsedSupplier(id);
        }
    }, [id, loadSuppliers, isUsedSupplier])
    if (!supplier) return null;
    return (
        <>
            <Segment clearing color={"blue"}>
                <FormField>
                    <strong>Tên nhà cung cấp:</strong>
                </FormField>
                <CardHeader>{supplier.supplierName}</CardHeader>
                <br />
                <FormField>
                    <strong>Tên giao dịch:</strong>
                </FormField>
                <CardHeader>{supplier.contactName}</CardHeader>
                <br />
                <FormField>
                    <strong>Điện thoại:</strong>
                </FormField>
                <CardHeader>{supplier.phone}</CardHeader>
                <br />
                <FormField>
                    <strong>Gmail:</strong>
                </FormField>
                <CardHeader>{supplier.email}</CardHeader>
                <br />
                <FormField>
                    <strong>Địa chỉ:</strong>
                </FormField>
                <CardHeader>{supplier.address}</CardHeader>
                <br />
                <FormField>
                    <strong>Tỉnh thành:</strong>
                </FormField>
                <CardHeader>{supplier.provice}</CardHeader>
                {isused !== undefined &&
                    (!isused) && (
                        <Button floated="right" color='red' type="submit" content="Xóa" onClick={(e) => handleSupplierDelete(supplier.id)} />
                    )
                }
                <Button as={Link} to={'/supplier'} floated="right" type='button' content='Quay lại' />
            </Segment>

        </>
    );
})