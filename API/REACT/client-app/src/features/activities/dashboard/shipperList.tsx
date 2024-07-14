import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, FormField, Form, FormGroup, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableFooter, Menu, MenuItem, Icon } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";

export default observer(function ShipperList() {
    const { shipperStore } = useStore();
    const { shippers, loadShipper, pageCount, pageShipper } = shipperStore;
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchShipper') || '');
    const [page, setPage] = useState(parseInt(localStorage.getItem('pageShipper') || '1', 10));
    const pageSize = 1;


    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearchTerm(value);
        localStorage.setItem('searchShipper', value);
    }

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            loadShipper(searchTerm, page, pageSize);
        } else {
            loadShipper('', page, pageSize);
        }
    }, [searchTerm, page, loadShipper]);


    useEffect(() => {
        if (searchTerm.trim() !== '') {
            pageShipper(pageSize, searchTerm);
        } else {
            pageShipper(pageSize, '');
        }

    }, [pageShipper, pageSize, searchTerm]);

    useEffect(() => {
        localStorage.setItem('pageShipper', page.toString());
    }, [page]);

    return (
        <>
            <Segment clearing color={"blue"}>
                <Form>
                    <FormGroup>
                        <FormField width={15}>
                            <input
                                placeholder='Nhập tên người giao hàng'
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </FormField>
                        <Button size='small' color="blue" content='Thêm' as={NavLink} to='/createShipper' />
                    </FormGroup>
                </Form>
                <Table celled unstackable style={{ width: '100%' }}>
                    <TableHeader>
                        <TableRow style={{ color: 'blue' }}>
                            <TableHeaderCell>Tên người giao hàng</TableHeaderCell>
                            <TableHeaderCell>Số điện thoại</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shippers.map(shipper => (
                            <TableRow key={shipper.id}>
                                <TableCell>{shipper.shipperName}</TableCell>
                                <TableCell>{shipper.phone}</TableCell>
                                <TableCell>
                                    <Button size='mini' color="red" as={Link}
                                        to={`/shipperDetail/${shipper.id}`} floated='right' icon='delete' />
                                    <Button size='mini' color="blue" as={Link} to={`/updateShipper/${shipper.id}`} floated='right' icon='edit' />
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
