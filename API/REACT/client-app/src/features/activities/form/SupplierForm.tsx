import React, { ChangeEvent, useEffect, useState } from "react";
import { Segment, Form, Button, FormField, Dropdown } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Supplier } from "../../../app/models/supplier";


export default observer(function SupplierForm() {
    const { supplierStore, provinceStore } = useStore();
    const { createSupplier, updateSupplier, loading, loadSuppliers } = supplierStore;
    const { loadProvince, provinces } = provinceStore;

    const [inputError, setInputError] = useState<string | null>(null);
    const { id } = useParams();

    const navigate = useNavigate();

    const [supplier, setSupplier] = useState<Supplier>({
        id: '',
        supplierName: '',
        contactName: '',
        provice: '',
        address: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        if (id) loadSuppliers(id).then(supplier => setSupplier(supplier!));
        loadProvince();
    }, [id, loadSuppliers, loadProvince]);

    useEffect(() => {
        if (inputError) {
            const timer = setTimeout(() => {
                setInputError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [inputError]);

    function handleSubmit() {

        if (!supplier.email || !supplier.supplierName || !supplier.phone || !supplier.provice) {
            setInputError("Nhập đầy đủ thông tin!");
            return;
        }
        if (!supplier.id) {
            createSupplier(supplier).then(() => navigate(`/supplier/${supplier.id}`));
            alert('Thêm thành công!');
        } else {
            updateSupplier(supplier).then(() => navigate(`/supplier`));
            alert('Cập nhật thành công!');
        }
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setSupplier({ ...supplier, [name]: value })
    }

    return (
        <>

            <Segment clearing color={"blue"}>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <FormField>
                        <label>Tên nhà cung cấp:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập tên nhà cung cấp'
                        value={supplier.supplierName}
                        name='supplierName'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Tên giao dịch:</label>
                    </FormField>
                    <Form.Input placeholder='Tên giao dịch'
                        value={supplier.contactName}
                        name='contactName'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Điện thoại:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập số điện thoại'
                        value={supplier.phone}
                        name='phone'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Email:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập Email'
                        value={supplier.email}
                        name='email'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Địa chỉ:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập địa chỉ'
                        value={supplier.address}
                        name='address'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Tỉnh/thành:</label>
                    </FormField>
                    <Dropdown
                        placeholder='Tỉnh/Thành'
                        fluid
                        selection
                        options={provinces.map(province => ({
                            key: province.provinceName,
                            text: province.provinceName,
                            value: province.provinceName
                        }))}
                        value={supplier.provice}
                        onChange={(e, data) => setSupplier({ ...supplier, provice: data.value as string })}
                    />
                    <br />
                    {inputError && (
                        <p style={{ color: 'red' }}>{inputError}</p>
                    )}
                    <br />
                    <Button loading={loading} floated="right" positive type="submit" content="Lưu" />
                    <Button as={Link} to={'/supplier'} floated="right" type='button' content='Quay lại' />
                </Form>
            </Segment>
        </>
    );
})