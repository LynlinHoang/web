import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, FormField, Form, FormGroup, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableFooter, Menu, MenuItem, Icon } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";

export default observer(function SupplierList() {
    const { supplierStore } = useStore();
    const { suppliers, loadSupplier, pageSupplier, pageCount } = supplierStore;
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchSupplier') || '');
    const [page, setPage] = useState(parseInt(localStorage.getItem('pageSupplier') || '1', 10));

    const pageSize = 10;

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearchTerm(value);
        localStorage.setItem('searchSupplier', value);
        setPage(1);
    }



    useEffect(() => {
        if (searchTerm.trim() !== '') {
            loadSupplier(searchTerm, page, pageSize);
        } else {
            loadSupplier('', page, pageSize);
        }
    }, [searchTerm, page, loadSupplier]);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            pageSupplier(pageSize, searchTerm);
        } else {
            pageSupplier(pageSize, '');
        }
    }, [pageSupplier, pageSize, searchTerm]);
    useEffect(() => {
        localStorage.setItem('pageSupplier', page.toString());
    }, [page]);

    return (
        <>
            <Segment clearing color={"blue"}>
                <Form>
                    <FormGroup>
                        <FormField width={15}>
                            <input placeholder='Nhập tên nhà cung cấp' value={searchTerm}
                                onChange={handleSearchChange} />
                        </FormField>
                        <Button size='small' color="blue" content='Thêm' as={NavLink} to='/createSuplier' />
                    </FormGroup>
                </Form>
                <Table celled unstackable style={{ width: '100%' }}>
                    <TableHeader >
                        <TableRow style={{ color: 'blue' }}>
                            <TableHeaderCell>Tên nhà cung cấp</TableHeaderCell>
                            <TableHeaderCell>Tên giao dịch</TableHeaderCell>
                            <TableHeaderCell>Điện thoại</TableHeaderCell>
                            <TableHeaderCell>Gmail</TableHeaderCell>
                            <TableHeaderCell>Địa chỉ</TableHeaderCell>
                            <TableHeaderCell>Tỉnh Thành</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {suppliers.map(supplier => (
                            <TableRow key={supplier.id}>
                                <TableCell>{supplier.supplierName}</TableCell>
                                <TableCell>{supplier.contactName}</TableCell>
                                <TableCell>{supplier.phone}</TableCell>
                                <TableCell>{supplier.email}</TableCell>
                                <TableCell>{supplier.address}</TableCell>
                                <TableCell>{supplier.provice}</TableCell>
                                <TableCell>
                                    <Button size='mini' color="red" as={Link}
                                        to={`/supplierDetail/${supplier.id}`} floated='right' icon='delete' />
                                    <Button size='mini' color="blue" as={Link}
                                        to={`/updateSupplier/${supplier.id}`} floated='right' icon='edit' />
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
