import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, FormField, Form, FormGroup, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, Image, TableRow, MenuItem, TableFooter, Menu, Icon } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, NavLink, } from "react-router-dom";



export default observer(function ProductList() {
    const { productStore } = useStore();
    const { products, loadProduct, pageCount, pageProduct } = productStore;
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchProduct') || '');
    const [page, setPage] = useState(parseInt(localStorage.getItem('pageProduct') || '1', 10));

    const pageSize = 5;

    console.log(pageCount);
    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearchTerm(value);
        localStorage.setItem('searchProduct', value);
    }
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            loadProduct(searchTerm, page, pageSize);
        } else {
            loadProduct('', page, pageSize);
        }
    }, [searchTerm, page, loadProduct]);


    useEffect(() => {
        if (searchTerm.trim() !== '') {
            pageProduct(pageSize, searchTerm)
        } else {
            pageProduct(pageSize, '')
        }

    }, [pageProduct, pageSize, searchTerm]);
    useEffect(() => {
        localStorage.setItem('pageProduct', page.toString());
    }, [page]);
    return (
        <>
            <Segment clearing color={"blue"}>
                <Form>
                    <FormGroup>
                        <FormField width={15}>
                            <input placeholder='Nhập tên loại hàng' value={searchTerm}
                                onChange={handleSearchChange} />
                        </FormField>
                        <Button size='small' color="blue" content='Thêm' as={NavLink} to='/createProduct' />
                    </FormGroup>
                </Form>
                <Table celled unstackable style={{ width: '100%' }}>

                    <TableHeader >
                        <TableRow style={{ color: 'blue' }}>
                            <TableHeaderCell >Ảnh</TableHeaderCell>
                            <TableHeaderCell >Tên sản phẩm</TableHeaderCell>
                            <TableHeaderCell >Mô tả</TableHeaderCell>
                            <TableHeaderCell >Đơn vị</TableHeaderCell>
                            <TableHeaderCell >Gía</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody >
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Image
                                        size='tiny'
                                        src={product.photo || 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg'}
                                    />
                                </TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.productDescription}</TableCell>
                                <TableCell>{product.unit}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Button size='mini' color="red" as={Link}
                                        to={`/productDetail/${product.id}`} floated='right' icon='delete' />
                                    <Button size='mini' color="blue" as={Link}
                                        to={`/updateProduct/${product.id}`} floated='right' icon='edit' />
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
    )
})