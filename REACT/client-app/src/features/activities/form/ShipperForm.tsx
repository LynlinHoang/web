import React, { ChangeEvent, useEffect, useState } from "react";
import { Segment, Form, Button, FormField } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Shipper } from "../../../app/models/shipper";


export default observer(function ShipperForm() {
    const { shipperStore } = useStore();
    const { createShipperName, updateShipper, loading, loadShippers } = shipperStore;
    const { id } = useParams();
    const [inputError, setInputError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [shipper, setShipper] = useState<Shipper>({
        id: '',
        shipperName: '',
        phone: '',
    });

    useEffect(() => {
        if (id) loadShippers(id).then(shipper => setShipper(shipper!))
    }, [id, loadShippers]);

    useEffect(() => {
        if (inputError) {
            const timer = setTimeout(() => {
                setInputError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [inputError]);

    function handleSubmit() {
        if (!shipper.shipperName || !shipper.phone) {
            setInputError("Nhập đầy đủ thông tin!");
            return;
        }
        if (!shipper.id) {
            createShipperName(shipper).then(() => navigate(`/shipper/${shipper.id}`))
        } else {
            updateShipper(shipper).then(() => navigate(`/shipper`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setShipper({ ...shipper, [name]: value })
    }



    return (
        <>

            <Segment clearing color={"blue"}>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <FormField>
                        <label>Tên người giao hàng:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập tên người giao hàng'
                        value={shipper.shipperName}
                        name='shipperName'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Số điện thoại:</label>
                    </FormField>
                    <Form.Input
                        placeholder='nhập số điện thoại'
                        value={shipper.phone}
                        name='phone'
                        onChange={handleInputChange} />

                    <br />
                    {inputError && (
                        <p style={{ color: 'red' }}>{inputError}</p>
                    )}
                    <br />
                    <Button loading={loading} floated="right" positive type="submit" content="Lưu" />
                    <Button as={Link} to={'/shipper'} floated="right" type='button' content='Quay lại' />
                </Form>
            </Segment>
        </>
    );
})
