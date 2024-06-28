import React, { ChangeEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import {
    Segment, Form, Button, FormGroup, FormField, TableHeader,
    TableRow, TableHeaderCell, TableBody, TableCell, Table,
    Input,
    Dropdown,
    DropdownProps,
    TableFooter,
    Menu,
    MenuItem,
    Icon
} from 'semantic-ui-react';

export default observer(function OrderList() {
    const options = [
        { key: 1, text: 'Đơn hàng mới', value: 1 },
        { key: 2, text: 'Đơn hàng đã duyệt', value: 2 },
        { key: 3, text: 'Đơn hàng đang được giao', value: 3 },
        { key: 4, text: 'Đơn hàng thành công', value: 4 },
        { key: 5, text: 'Đơn hàng bị hủy', value: 5 },
        { key: 6, text: 'Đơn hàng bị từ chối', value: 6 },
    ];

    const { orderStore } = useStore();
    const { contentOrders, loadOrder, pageCount, pageOrder } = orderStore;

    const [status, setStatus] = useState<number>(() => parseInt(localStorage.getItem('status') || '1', 10));
    const [searchOrder, setSearchOrder] = useState(localStorage.getItem('searchOrder') || '');
    const [page, setPage] = useState(1);

    const pageSize = 5;

    const [fromDate, setFromDate] = useState<Date | null>(() => {
        const date = localStorage.getItem('fromDate');
        return date ? new Date(date) : new Date();
    });

    const [toDate, setToDate] = useState<Date | null>(() => {
        const date = localStorage.getItem('toDate');
        return date ? new Date(date) : new Date();
    });

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearchOrder(value);
        localStorage.setItem('searchOrder', value);
        setPage(1);
    }

    function handleSearchStatus(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        const value = data.value as number;
        setStatus(value);
        localStorage.setItem('status', value.toString());
        setPage(1);
    }

    useEffect(() => {
        if (fromDate && toDate) {
            if (searchOrder.trim() !== '') {
                loadOrder(status, fromDate, toDate, searchOrder, page, pageSize);
            } else {
                loadOrder(status, fromDate, toDate, '', page, pageSize);
            }
        }
    }, [status, fromDate, toDate, searchOrder, page, loadOrder]);




    useEffect(() => {
        if (fromDate) {
            localStorage.setItem('fromDate', fromDate.toISOString());

        }
    }, [fromDate]);

    useEffect(() => {
        if (toDate) {
            localStorage.setItem('toDate', toDate.toISOString());

        }
    }, [toDate]);

    useEffect(() => {
        if (fromDate && toDate) {
            if (searchOrder.trim() !== '') {
                pageOrder(status, fromDate, toDate, searchOrder, pageSize);
            } else {
                pageOrder(status, fromDate, toDate, '', pageSize);
            }
        }
    }, [status, fromDate, toDate, searchOrder, pageSize, pageOrder]);

    return (
        <>
            <Segment clearing color="blue">
                <Form>
                    <FormGroup widths='equal'>
                        <FormField width={7}>
                            <strong>Status</strong>
                            <Dropdown
                                search
                                selection
                                options={options}
                                value={status}
                                onChange={handleSearchStatus}
                            />
                        </FormField>
                        <FormField width={6}>

                            <strong>FromDate</strong>
                            <DatePicker
                                selected={fromDate}
                                onChange={(date) => setFromDate(date)}
                            />

                        </FormField>
                        <FormField width={6}>
                            <strong>ToDate</strong>
                            <DatePicker
                                selected={toDate}
                                onChange={(date) => setToDate(date)}
                            />
                        </FormField>
                        <FormField >
                            <strong>Tìm kiếm khách hàng</strong>
                            <FormField
                                control={Input}
                                placeholder='Tìm kiếm theo người đặt hàng'
                                value={searchOrder}
                                onChange={handleSearchChange}
                            />
                        </FormField>
                    </FormGroup>

                </Form>
                <Table celled unstackable style={{ width: '100%' }}>
                    <TableHeader>
                        <TableRow style={{ color: 'blue' }}>
                            <TableHeaderCell>Khách hàng</TableHeaderCell>
                            <TableHeaderCell>Ngày lập</TableHeaderCell>
                            <TableHeaderCell>Nhân viên phụ trách</TableHeaderCell>
                            <TableHeaderCell>Thời điểm duyệt</TableHeaderCell>
                            <TableHeaderCell>Người giao hàng</TableHeaderCell>
                            <TableHeaderCell>Ngày nhận giao hàng</TableHeaderCell>
                            <TableHeaderCell>Thời điểm kết thúc</TableHeaderCell>
                            <TableHeaderCell>Trạng thái</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contentOrders.map(contentOrder => (
                            <TableRow key={contentOrder.id}>
                                <TableCell>{contentOrder.customer.customerName}</TableCell>
                                <TableCell>{contentOrder.orderTime}</TableCell>
                                <TableCell>{contentOrder.employee.fullName}</TableCell>
                                <TableCell>{contentOrder.acceptTime}</TableCell>
                                <TableCell>{contentOrder.shipper ? contentOrder.shipper.shipperName : null}</TableCell>
                                <TableCell>{contentOrder.shippedTime}</TableCell>
                                <TableCell>{contentOrder.finishedTime}</TableCell>
                                <TableCell>{contentOrder.status.description}</TableCell>
                                <TableCell>
                                    <Button size='mini' color="blue" floated='right' icon='list ul' as={Link} to={`/orderDetail/${contentOrder.id}`} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <table>
                    {pageCount > 0 && (
                        <TableFooter>
                            <TableRow>
                                <TableHeaderCell>
                                    <Menu>
                                        {page > 1 && (
                                            <MenuItem as='a' icon onClick={() => setPage(page - 1)}>
                                                <Icon name='chevron left' />
                                            </MenuItem>
                                        )}
                                        {Array.from({ length: pageCount }, (_, i) => (
                                            <MenuItem
                                                as="a"
                                                key={i + 1}
                                                onClick={() => setPage(i + 1)}
                                                active={page === i + 1}
                                            >
                                                {i + 1}
                                            </MenuItem>
                                        ))}
                                        {page < pageCount && (
                                            <MenuItem as='a' icon onClick={() => setPage(page + 1)}>
                                                <Icon name='chevron right' />
                                            </MenuItem>
                                        )}
                                    </Menu>
                                </TableHeaderCell>
                            </TableRow>
                        </TableFooter>
                    )}
                </table>
            </Segment>
        </>
    );
});
