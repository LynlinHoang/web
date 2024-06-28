import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormField, FormGroup, Message, Radio, Segment } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useStore } from "../../../app/stores/store";
import { Employee } from "../../../app/models/employee";
import { EmployeeAppUpdate } from "../../../app/models/employeeAddUpdate";

export default observer(function EmployeeForm() {
    const { employeeStore } = useStore();
    const { createEmployee, updateEmployee, loadEmployees, loading } = employeeStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputError, setInputError] = useState<string | null>(null);
    const [employee, setEmployee] = useState<Employee>({
        id: '',
        fullName: '',
        birthDate: new Date(),
        address: '',
        phone: '',
        email: '',
        photo: '',
        isWorking: true
    });
    const [employeeAddUpdate, setEmployeeAddUpdate] = useState<EmployeeAppUpdate>({
        id: '',
        fullName: '',
        birthDate: new Date(),
        address: '',
        phone: '',
        email: '',
        uploadFile: new File([], ''),
        isWorking: true
    });

    const copyEmployeeToEmployeeAddUpdate = () => {
        const { id, fullName, birthDate, address, phone, email, isWorking } = employee;
        const newEmployeeAddUpdate: EmployeeAppUpdate = {
            id,
            fullName,
            birthDate,
            address,
            phone,
            uploadFile: employeeAddUpdate.uploadFile,
            email,
            isWorking
        };
        setEmployeeAddUpdate(newEmployeeAddUpdate);
    };

    const [errors, setErrors] = useState({
        email: '',
    });

    useEffect(() => {
        copyEmployeeToEmployeeAddUpdate();
    }, [employee]);

    useEffect(() => {
        if (id) loadEmployees(id).then(employee => setEmployee(employee!));
    }, [id, loadEmployees]);

    useEffect(() => {
        if (inputError) {
            const timer = setTimeout(() => {
                setInputError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [inputError]);



    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = event.target;

        if (name === 'uploadFile' && files && files.length > 0) {
            const file = files[0];
            setEmployeeAddUpdate({ ...employeeAddUpdate, uploadFile: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmployee({ ...employee, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        } else {
            setEmployee({ ...employee, [name]: value });
        }

        if (name === 'email') {
            validateEmail(value);
        }
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[\w]+@([\w]+\.)+[\w]{2,4}$/;
        if (!emailRegex.test(email)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Email không hợp lệ',
            }));
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: '',
            }));
        }
    };

    function handleSubmit() {
        if (errors.email) {
            setInputError("Email không hợp lệ!");
            return;
        }
        if (!employee.address || !employee.fullName || !employee.email || !employee.phone) {
            setInputError("Nhập đầy đủ thông tin!");
            return;
        }
        if (!employee.id) {
            createEmployee(employeeAddUpdate).then(() => navigate(`/employee`));
            alert('Thêm thành công!');
        } else {
            updateEmployee(employeeAddUpdate).then(() => navigate(`/employee`));
            alert('Cập nhật thành công!');
        }
    }

    return (
        <>
            <Segment clearing color={"blue"}>
                <Form autoComplete='off' onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormField width={14}>
                            <label>Họ và tên:</label>
                            <Form.Input
                                placeholder='Nhập họ tên'
                                name='fullName'
                                value={employee.fullName}
                                onChange={handleInputChange}
                            />
                        </FormField>
                        <FormField>
                            <label>Ngày sinh:</label>
                            <DatePicker
                                selected={employee.birthDate}
                                onChange={(date: Date) => setEmployee({ ...employee, birthDate: date })}
                            />
                        </FormField>
                    </FormGroup>
                    <FormField>
                        <label>Địa chỉ:</label>
                        <Form.Input
                            placeholder='Nhập địa chỉ'
                            name='address'
                            value={employee.address}
                            onChange={handleInputChange}
                        />
                    </FormField>
                    <FormField>
                        <label>Số điện thoại:</label>
                        <Form.Input
                            placeholder='Nhập số điện thoại'
                            name='phone'
                            value={employee.phone}
                            onChange={handleInputChange}
                            maxLength="10"
                            type="tel"
                        />
                    </FormField>
                    <FormField>
                        <label>Email</label>
                        <Form.Input
                            type="email"
                            placeholder='Nhập Email'
                            name='email'
                            value={employee.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    </FormField>

                    <br />
                    <Radio
                        label='Đang làm việc.'
                        name='radioGroup'
                        value='true'
                        checked={employee.isWorking === true}
                        onChange={() => setEmployee({ ...employee, isWorking: true })}
                    /><samp> </samp>
                    <Radio
                        label='Nghỉ việc.'
                        name='radioGroup'
                        value='false'
                        checked={employee.isWorking === false}
                        onChange={() => setEmployee({ ...employee, isWorking: false })}
                    />
                    <br />

                    <FormField>
                        <label>Ảnh:</label>
                    </FormField>
                    <input type="file" name="uploadFile" onChange={handleInputChange} />
                    {inputError && (
                        <p style={{ color: 'red' }}>{inputError}</p>
                    )}
                    <br />
                    <br />

                    <img src={employee.photo || 'https://localhost:44309/Images/Employees/20240519053405.jpg'} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />

                    <br />
                    <br />
                    <Button loading={loading} floated="right" positive type="submit" content="Lưu" />
                    <Button as={Link} to={'/employee'} floated="right" type='button' content='Quay lại' />
                </Form>
            </Segment>
        </>
    );
});
