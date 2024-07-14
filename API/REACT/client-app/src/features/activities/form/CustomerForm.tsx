import React, { ChangeEvent, useEffect, useState } from "react";
import { Segment, Form, Button, FormField, Dropdown, Radio } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Customer } from "../../../app/models/customer";


export default observer(function SupplierForm() {
    const { customerStore, provinceStore } = useStore();
    const { createCustomer, updateCustomer, loading, loadCustomers } = customerStore;
    const { loadProvince, provinces } = provinceStore;
    const { id } = useParams();
    const [inputError, setInputError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [customer, setCustomer] = useState<Customer>({
        id: '',
        customerName: '',
        contactName: '',
        province: '',
        address: '',
        phone: '',
        email: '',
        isLocked: true
    });

    useEffect(() => {
        if (id) loadCustomers(id).then(customer => setCustomer(customer!));
        loadProvince();
    }, [id, loadCustomers, loadProvince]);

    useEffect(() => {
        if (inputError) {
            const timer = setTimeout(() => {
                setInputError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [inputError]);

    function handleSubmit() {

        if (!customer.contactName || !customer.customerName || !customer.phone || !customer.province) {
            setInputError("Nhập đầy đủ thông tin!");
            return;
        }
        if (!customer.id) {
            createCustomer(customer).then(() => navigate(`/customer`))
        } else {
            updateCustomer(customer).then(() => navigate(`/customer`))
        }
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value })
    }



    return (
        <>

            <Segment clearing color={"blue"}>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <FormField>
                        <label>Tên khách hàng:</label>
                    </FormField>
                    <Form.Input placeholder='Tên khách hàng'
                        value={customer.customerName}
                        name='customerName'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Tên giao dịch:</label>
                    </FormField>
                    <Form.Input placeholder='Tên giao dịch'
                        value={customer.contactName}
                        name='contactName'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Điện thoại:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập số điện thoại'
                        value={customer.phone}
                        name='phone'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Email:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập Email'
                        value={customer.email}
                        name='email'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Địa chỉ:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập địa chỉ'
                        value={customer.address}
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
                        value={customer.province}
                        onChange={(e, data) => setCustomer({ ...customer, province: data.value as string })}
                    />
                    <br />
                    <Radio
                        label='Đang hoạt động.'
                        name='radioGroup'
                        value='true'
                        checked={customer.isLocked === true}
                        onChange={(e) => {
                            setCustomer({ ...customer, isLocked: true });
                        }}
                    /><samp> </samp>
                    <Radio
                        label='Ngừng hoạt động.'
                        name='radioGroup'
                        value='false'
                        checked={customer.isLocked === false}
                        onChange={(e) => {
                            setCustomer({ ...customer, isLocked: false });
                        }}
                    />

                    <br />
                    {inputError && (
                        <p style={{ color: 'red' }}>{inputError}</p>
                    )}
                    <br />
                    <Button loading={loading} floated="right" positive type="submit" content="Lưu" />
                    <Button as={Link} to={'/customer'} floated="right" type='button' content='Quay lại' />
                </Form>
            </Segment>
        </>
    );
})