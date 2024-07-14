import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, FormField, Form, FormGroup, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableFooter, Menu, MenuItem, Icon } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";

export default observer(function CustomerList() {
    const { customerStore } = useStore();
    const { customers, loadCustomer, pageCount, pageCustomer } = customerStore;
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchCustomer') || '');
    const [page, setPage] = useState(parseInt(localStorage.getItem('pageCustomer') || '1', 10));

    const pageSize = 10;

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearchTerm(value);
        localStorage.setItem('searchCustomer', value);
        setPage(1);
    }

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            loadCustomer(searchTerm, page, pageSize);
        } else {
            loadCustomer('', page, pageSize);
        }
    }, [searchTerm, page, loadCustomer]);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            pageCustomer(pageSize, searchTerm);
        } else {
            pageCustomer(pageSize, '');
        }

    }, [pageCustomer, pageSize, searchTerm]);

    useEffect(() => {
        localStorage.setItem('pageCustomer', page.toString());
    }, [page]);

    return (
        <>
            <Segment clearing color={"blue"}>
                <Form>
                    <FormGroup>
                        <FormField width={15}>
                            <input placeholder='Nhập tên khách hàng' value={searchTerm} onChange={handleSearchChange} />
                        </FormField>
                        <Button size='small' color="blue" content='Thêm' as={NavLink} to='/createCustomer' />
                    </FormGroup>
                </Form>
                <Table celled unstackable style={{ width: '100%' }}>
                    <TableHeader>
                        <TableRow style={{ color: 'blue' }}>
                            <TableHeaderCell>Tên khách hàng</TableHeaderCell>
                            <TableHeaderCell>Tên giao dịch</TableHeaderCell>
                            <TableHeaderCell>Điện thoại</TableHeaderCell>
                            <TableHeaderCell>Gmail</TableHeaderCell>
                            <TableHeaderCell>Địa chỉ</TableHeaderCell>
                            <TableHeaderCell>Tỉnh Thành</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {customers.map(customer => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.customerName}</TableCell>
                                <TableCell>{customer.contactName}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>{customer.province}</TableCell>
                                <TableCell>
                                    <Button size='mini' color="red" as={Link} to={`/customerDetail/${customer.id}`} floated='right' icon='delete' />
                                    <Button size='mini' color="blue" as={Link} to={`/updateCustomer/${customer.id}`} floated='right' icon='edit' />
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
