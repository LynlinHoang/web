import React, { ChangeEvent, useEffect, useState } from "react";
import { Segment, Grid, ItemGroup, Item, ItemImage, ItemContent, ItemMeta, Input, Form, Button, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, TableFooter, Table, Menu, MenuItem, Dropdown, Modal, Icon } from 'semantic-ui-react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { ProductCart } from "../../../app/models/productcart";
import { Product } from "../../../app/models/product";
import { Order } from "../../../app/models/order";
import { DetailOrder } from "../../../app/models/detailorder";
import { useNavigate } from "react-router-dom";

export default observer(function ShowShoppingCart() {
    const { productStore, provinceStore, customerStore, orderStore } = useStore();
    const { products, loadProduct, pageProduct, pageCount } = productStore;
    const { provinces, loadProvince } = provinceStore;
    const { customers, loadCustomer } = customerStore;
    const { createOrder, getOrderCreat } = orderStore;
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<ProductCart[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchCart') || '');
    const [page, setPage] = useState(parseInt(localStorage.getItem('pageCart') || '1', 10));

    const pagenumber = 1;
    const pageSize = 3;
    const sizeCustomer = 100;
    const id = localStorage.getItem('id') || 'User';
    const [order, setOrder] = useState<Order>({
        id: '',
        orderTime: '',
        acceptTime: '',
        customerID: '',
        deliveryProvince: '',
        deliveryAddress: '',
        employeeID: id,
        shipperID: '',
        shippedTime: '',
        finishedTime: '',
        statusID: 1,
        detailOrder: [],
    });
    const [detailOrder, setDetailOrder] = useState<DetailOrder[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [errorCart, setErrorCart] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('pageCart', page.toString());
    }, [page]);

    useEffect(() => {
        loadProvince();
        loadCustomer('', pagenumber, sizeCustomer);
    }, [loadProvince, loadCustomer]);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            loadProduct(searchTerm, page, pageSize);
        } else {
            loadProduct('', page, pageSize);
        }
    }, [searchTerm, page, loadProduct]);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            pageProduct(pageSize, searchTerm);
        } else {
            pageProduct(pageSize, '');
        }
    }, [pageProduct, pageSize, searchTerm]);

    useEffect(() => {
        const updatedDetailOrder = cartItems.map(item => ({
            productID: item.productID,
            quantity: item.quantity,
            salePrice: item.price,
        }));
        setDetailOrder(updatedDetailOrder);
    }, [cartItems]);

    useEffect(() => {
        setOrder({ ...order, detailOrder });
    }, [detailOrder]);

    function handleSubmit() {
        if (cartItems == null || cartItems.length === 0) {
            setErrorCart('Giỏ hàng trống!');
            setTimeout(() => {
                setErrorCart('');
            }, 3000);
            return;

        }
        if (order.customerID !== '' && order.deliveryProvince !== '' && order.deliveryAddress !== '') {
            createOrder(order);
            setCartItems([]);
            setModalOpen(true);
            setOrder({
                id: '',
                orderTime: '',
                acceptTime: '',
                customerID: '',
                deliveryProvince: '',
                deliveryAddress: '',
                employeeID: id,
                shipperID: '',
                shippedTime: '',
                finishedTime: '',
                statusID: 1,
                detailOrder: [],
            });
        } else {
            setError('Nhập đầy đủ thông tin!');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    function addToCart(product: Product) {
        const productCart: ProductCart = {
            productID: product.id,
            quantity: quantity,
            productName: product.productName,
            unit: product.unit,
            price: product.price
        };
        const existingItemIndex = cartItems.findIndex(item => item.productID === product.id);
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += quantity;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, productCart]);
        }
    }

    function calculateTotalPrice() {
        let total = 0;
        for (const item of cartItems) {
            total += item.price * item.quantity;
        }
        return total;
    }

    function clearCart() {
        setCartItems([]);
    }

    function removeFromCart(index: number) {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    }

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        localStorage.setItem('searchCart', value);
        setSearchTerm(value);
        setPage(1);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setOrder({ ...order, [name]: value });
    }

    function handleModalConfirm() {
        setModalOpen(false);
        navigate(`/orderDetail/${getOrderCreat?.id}`);
    }

    function handleCancel() {
        setModalOpen(false);

    }

    return (
        <Segment clearing color="blue">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <h5 style={{ marginLeft: '10px' }}><strong>Danh sách mặt hàng</strong></h5>
                        <Form style={{ marginLeft: '10px' }}>
                            <Input fluid icon='search' placeholder='Search...' value={searchTerm} onChange={handleSearchChange} />
                        </Form>
                        <ItemGroup>
                            {products.map(product => (
                                <Item key={product.id} style={{ border: '1px solid #ccc', marginLeft: '10px', padding: '15px' }}>
                                    <ItemImage size='tiny' src={product.photo} />
                                    <ItemContent>
                                        <strong>{product.productName}</strong>
                                        <Form>
                                            <ItemMeta>
                                                <strong>Giá bán:</strong>
                                                <strong style={{ float: 'right' }}>Số lượng:</strong>
                                            </ItemMeta>
                                            <ItemMeta>
                                                <Input min='0' size='mini' value={product.price} />
                                                <Input type='number' min='1' size='mini' style={{ float: 'right' }} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                                            </ItemMeta>
                                            <Button onClick={() => addToCart(product)} color='blue' type="submit" content="Thêm giỏ hàng" size='mini' icon='cart' style={{ float: 'right' }} />
                                        </Form>
                                    </ItemContent>
                                </Item>
                            ))}

                        </ItemGroup>
                        <table>
                            {pageCount > 0 && (
                                <TableFooter>
                                    <TableRow>
                                        <TableHeaderCell colSpan="7">
                                            <Menu floated='right' pagination>
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

                    </Grid.Column>
                    <Grid.Column width={10}>
                        <h5 style={{ marginLeft: '10px' }}><strong>Danh sách mặt hàng đã chọn</strong></h5>
                        <Table celled>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>STT</TableHeaderCell>
                                    <TableHeaderCell>Tên mặt hàng</TableHeaderCell>
                                    <TableHeaderCell>ĐVT</TableHeaderCell>
                                    <TableHeaderCell>Số Lượng</TableHeaderCell>
                                    <TableHeaderCell>Gía</TableHeaderCell>
                                    <TableHeaderCell>Thành tiền</TableHeaderCell>
                                    <TableHeaderCell></TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartItems.map((item, index) => (
                                    <TableRow key={item.productID}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.productName}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.price * item.quantity}</TableCell>
                                        <TableCell>
                                            <Button size='mini' color="red" floated='right' icon='minus' onClick={() => removeFromCart(index)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <strong>Tổng tiền: {calculateTotalPrice()}</strong>
                        <br />
                        <br />
                        <p style={{ color: 'red' }}>{errorCart}</p>

                        <Button onClick={clearCart} color='red' type="submit" content="Xóa giỏ hàng" size='mini' icon='cart' style={{ float: 'right' }} />
                        <Segment clearing style={{ marginTop: '10%' }}>
                            <h5 style={{ marginLeft: '10px' }}><strong>Thông tin về khách hàng và địa chỉ giao hàng</strong></h5>
                            <br />
                            <strong>Tên khách hàng:</strong>
                            <Dropdown
                                placeholder='Tên khách hàng'
                                fluid
                                selection
                                options={customers.map(customer => ({
                                    key: customer.id,
                                    text: customer.customerName,
                                    value: customer.id
                                }))}
                                value={order.customerID}
                                onChange={(e, data) => setOrder({ ...order, customerID: data.value as string })}
                            />
                            <br />
                            <strong>Tỉnh/Thành:</strong>
                            <Dropdown
                                placeholder='Tỉnh/Thành'
                                fluid
                                selection
                                options={provinces.map(province => ({
                                    key: province.provinceName,
                                    text: province.provinceName,
                                    value: province.provinceName
                                }))}
                                value={order.deliveryProvince}
                                onChange={(e, data) => setOrder({ ...order, deliveryProvince: data.value as string })}
                            />
                            <br />
                            <strong>Địa chỉ nhận hàng:</strong>
                            <Input fluid placeholder='Nhập địa chỉ' value={order.deliveryAddress} name='deliveryAddress' onChange={handleInputChange} />
                            <br />
                            <p style={{ color: 'red' }}>{error}</p>
                            <Button onClick={handleSubmit} color='blue' type="submit" content="Thiết lập đơn hàng" size='mini' icon='plus' style={{ float: 'right' }} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Modal
                size='mini'
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: 'auto', }}
                open={modalOpen}
                onClose={() => setModalOpen(false)}>
                <Modal.Header >Order Created Successfully</Modal.Header>
                <Modal.Content>
                    <p>Đơn hàng đã được tạo thành công!</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button color='green' onClick={handleModalConfirm}>
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
        </Segment>
    );
});