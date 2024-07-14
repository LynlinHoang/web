import React, { useEffect } from "react";
import { CardHeader, Button, Segment, FormField, } from 'semantic-ui-react';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams, useNavigate } from "react-router-dom";


export default observer(function ShipperDetails() {
    const navigate = useNavigate();
    const { shipperStore } = useStore();
    const { selectedShipper: shipper, loadShippers, deleteShipper, isUsedShipper, isused } = shipperStore;
    const { id } = useParams();
    function handleSupplierDelete(id: string) {
        deleteShipper(id).then(() => navigate('/shipper'));
    }

    useEffect(() => {
        if (id) {

            loadShippers(id)
            isUsedShipper(id);
        }
    }, [id, loadShippers])
    if (!shipper) return null;
    return (
        <>
            <Segment clearing color={"blue"}>
                <FormField>
                    <strong>Tên người giao hàng:</strong>
                </FormField>
                <CardHeader>{shipper.shipperName}</CardHeader>
                <br />
                <FormField>
                    <strong>Số điện thoại:</strong>
                </FormField>
                <CardHeader>{shipper.phone}</CardHeader>
                {isused !== undefined &&
                    (!isused) && (
                        <Button floated="right" color='red' type="submit" content="Xóa" onClick={(e) => handleSupplierDelete(shipper.id)} />
                    )
                }

                <Button as={Link} to={'/shipper'} floated="right" type='button' content='Quay lại' />
            </Segment>

        </>
    );
})