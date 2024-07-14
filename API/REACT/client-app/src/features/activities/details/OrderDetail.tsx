import React, { useEffect, useState } from "react";
import {
    Segment, Grid, Button,
    TableHeader, TableRow, TableHeaderCell, TableBody, TableCell,
    Table,
    ListItem,
    ListHeader,
    ListContent,
    List,
    GridColumn,
    FormGroup,
    Confirm,
    Form,
    GridRow,
    DropdownMenu,
    DropdownItem,
    DropdownDivider,
    Dropdown,

} from 'semantic-ui-react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductOrder } from "../../../app/models/productorder";
import { ProductOrderUpdate } from "../../../app/models/productorderupdate";
import { OrderUpdate } from "../../../app/models/orderupdate";

export default observer(function OrderDetails() {

    const { orderStore, detailorderStore, shipperStore } = useStore();
    const { selectedOrder: contentOrder, loadContentOrder, deleteOrder,
        updateAccept, updateFinished, updateCancel, updateRefuse, updateShipper } = orderStore;
    const { shippers, loadShipper } = shipperStore;
    const { orderdetails, loadorderdetail, updateDetail, deleteorderdetail, getCount, countDetail } = detailorderStore;
    const [open, setOpen] = useState(false);
    const [openshipper, setOpenShipper] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();



    const initialProductOrder: ProductOrder = {
        id: '',
        productID: '',
        quantity: 0,
        salePrice: 0,
        product: {
            productName: '',
        },
    };
    const [editingOrderDetail, setEditingOrderDetail] = useState<ProductOrder>(initialProductOrder);

    const [productorderupdate, setProductOrderUpdate] = useState<ProductOrderUpdate>({
        id: '',
        productID: '',
        orderID: '',
        quantity: 0,
        salePrice: 0,
    });
    const [orderupdate, setOrderUpdate] = useState<OrderUpdate>({
        id: '',
        acceptTime: '',
        shipperID: '',
        shippedTime: '',
        finishedTime: '',
        statusID: 1,
    });

    const convertToProductOrderUpdate = (orderDetail: ProductOrder): ProductOrderUpdate => {
        let orderID: string = '';
        if (contentOrder && contentOrder.id) {
            orderID = contentOrder.id;
        }
        return {
            id: orderDetail.id,
            productID: orderDetail.productID,
            orderID: orderID,
            quantity: orderDetail.quantity,
            salePrice: orderDetail.salePrice,
        };
    };

    const handleButtonClick = (orderdetail: ProductOrder) => {
        setOpen(true);
        setEditingOrderDetail(orderdetail);

    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleCacncelShipper = () => {
        setOpenShipper(false);
    };
    const handleShipperClick = () => {
        setOpenShipper(true);
    };


    function handleConfirm() {
        updateDetail(productorderupdate).then(() => navigate(`/orderDetail/${contentOrder?.id}`));
        setOpen(false);
    };


    function handleDelete(id: string) {
        deleteorderdetail(id).then(() => navigate(`/orderDetail/${contentOrder?.id}`));
    }
    function handleAccept() {
        updateAccept(orderupdate, orderupdate.id);
    }
    function handleShipper() {
        updateShipper(orderupdate, orderupdate.id);
        setOpenShipper(false);
    };
    function handleFinished() {
        updateFinished(orderupdate, orderupdate.id);
    }
    function handleCancelOrder() {
        updateCancel(orderupdate, orderupdate.id);
    }
    function handleRefuse() {
        updateRefuse(orderupdate, orderupdate.id);
    }
    function handleDeleteOrder(id: string) {
        deleteOrder(id).then(() => navigate('/order'));
    }
    const pageSize = 100;
    useEffect(() => {
        if (id) {
            loadContentOrder(id);
            loadorderdetail(id);
        }
        loadShipper('', 1, pageSize)
    }, [id, loadContentOrder, loadorderdetail, loadShipper])

    useEffect(() => {
        if (id) {
            getCount(id);
        }
    }, [id, getCount, countDetail]);

    useEffect(() => {
        const updatedProductOrderUpdate = convertToProductOrderUpdate(editingOrderDetail);
        setProductOrderUpdate(updatedProductOrderUpdate);
    }, [editingOrderDetail]);

    useEffect(() => {
        if (contentOrder) {
            setOrderUpdate({
                id: contentOrder.id || '',
                acceptTime: contentOrder.acceptTime || '',
                shipperID: contentOrder.shipperID || '',
                shippedTime: contentOrder.shippedTime || '',
                finishedTime: contentOrder.finishedTime || '',
                statusID: contentOrder.statusID || 1,
            });
        }
    }, [contentOrder]);
    if (!contentOrder) return null;
    return (

        <>
            <Segment clearing color="blue">
                <FormGroup style={{ float: 'right', }}>
                    {contentOrder &&
                        (contentOrder.statusID === 1 || contentOrder.statusID === 2 || contentOrder.statusID === 3) && (
                            <Button color='olive' size="mini">
                                <Dropdown text='Xữ lý đơn hàng'>
                                    <DropdownMenu>
                                        {contentOrder &&
                                            (contentOrder.statusID == 1) && (

                                                <DropdownItem onClick={(e) => handleAccept()}>Duỵêt đơn hàng</DropdownItem>
                                            )
                                        }

                                        {contentOrder &&
                                            (contentOrder.statusID == 2) && (

                                                <DropdownItem onClick={handleShipperClick}>Chuyển giao đơn hàng</DropdownItem>
                                            )
                                        }
                                        <Confirm
                                            header='Chuyển giao hàng cho đơn hàng'
                                            open={openshipper}
                                            onCancel={handleCacncelShipper}
                                            onConfirm={handleShipper}
                                            size='tiny'
                                            color='red'
                                            style={{
                                                top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: 'auto', background: "white"
                                            }}
                                            content={

                                                <Form style={{ margin: '20px' }}>
                                                    <strong>Người giao hàng:</strong>
                                                    <br />
                                                    <br />
                                                    <Dropdown
                                                        placeholder='Tỉnh/Thành'
                                                        fluid
                                                        selection
                                                        options={shippers.map(shipper => ({
                                                            key: shipper.id,
                                                            text: shipper.shipperName,
                                                            value: shipper.id
                                                        }))}

                                                        onChange={(e, data) => setOrderUpdate({ ...orderupdate, shipperID: data.value as string })}
                                                    />

                                                </Form>
                                            }
                                        />
                                        {contentOrder &&
                                            (contentOrder.statusID == 3) && (

                                                <DropdownItem onClick={(e) => handleFinished()}>Xác nhận hoàn tất đơn hàng</DropdownItem>
                                            )
                                        }
                                        <DropdownDivider />
                                        <DropdownItem onClick={(e) => handleCancelOrder()}>Hủy đơn hàng</DropdownItem>
                                        {contentOrder &&
                                            (contentOrder.statusID == 3) && (

                                                <DropdownItem onClick={(e) => handleRefuse()}>Từ chối đơn hàng</DropdownItem>
                                            )
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </Button>
                        )
                    }
                    {contentOrder &&
                        (contentOrder.statusID === 1 || contentOrder.statusID === 2 || contentOrder.statusID === 5 || contentOrder.statusID === 6) && (
                            <Button
                                color='red'
                                size="mini"
                                onClick={() => handleDeleteOrder(contentOrder.id)}
                            >
                                Xóa đơn hàng
                            </Button>
                        )
                    }

                    <Button color='teal' size="mini" as={Link} to={'/order'}>Quay lại</Button>
                </FormGroup>
                <Grid columns={4} padded >
                    <GridColumn>
                        <List >
                            <ListItem >
                                <ListContent style={{ float: 'right' }}>
                                    <ListHeader>Mã đơn hàng:</ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem>
                                <ListContent style={{ float: 'right' }}>
                                    <ListHeader>Nhân viên phụ trách: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <br />
                            <ListItem>
                                <ListContent style={{ float: 'right' }}>
                                    <ListHeader>Khách hàng: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem>
                                <ListContent style={{ float: 'right' }}>
                                    <ListHeader >Địa chỉ: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem>
                                <ListContent style={{ float: 'right' }}>
                                    <ListHeader>Email: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <br />
                            <br />
                            <ListItem>
                                <ListContent>
                                    <ListHeader style={{ float: 'right' }}>Địa chỉ giao hàng: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem>
                                <ListContent>
                                    <ListHeader style={{ float: 'right' }}>Tỉnh/Thành: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <br />
                            <ListItem>
                                <ListContent>
                                    <ListHeader style={{ float: 'right' }}>Người giao hàng: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem>
                                <ListContent>
                                    <ListHeader style={{ float: 'right' }}>Nhận giao hàng lúc: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem>

                                <ListContent>
                                    <ListHeader style={{ float: 'right' }}>Trạng thái đơn hàng: </ListHeader>
                                </ListContent>
                            </ListItem>
                        </List>
                    </GridColumn>
                    <GridColumn>
                        <List >
                            <ListItem content='123' />
                            <br />
                            <ListItem content={contentOrder?.employee.fullName} />
                            <br />
                            <br />
                            <ListItem content={contentOrder?.customer.customerName} />
                            <br />
                            <ListItem content="..." />
                            <br />
                            <ListItem content={contentOrder?.customer.email} />
                            <br />
                            <br />
                            <br />
                            <ListItem content={contentOrder?.deliveryAddress} />
                            <br />
                            <ListItem content={contentOrder?.deliveryProvince} />
                            <br />
                            <br />
                            <ListItem content={contentOrder?.shipper?.shipperName ?? '...'} />
                            <br />
                            <ListItem content={contentOrder?.shippedTime ?? '...'} />
                            <br />
                            <ListItem content={contentOrder?.status.description} />
                        </List>
                    </GridColumn>
                    <GridColumn>
                        <List >
                            <ListItem>
                                <ListContent style={{ float: 'right' }}>
                                    <ListHeader>Ngày lập đơn hàng: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem>
                                <ListContent style={{ float: 'right' }}>
                                    <ListHeader >Ngày nhận đơn hàng: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <br />
                            <ListItem>
                                <ListContent style={{ float: 'right' }}>
                                    <ListHeader>Tên giao dịch: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem>
                                <ListContent>
                                    <ListHeader style={{ float: 'right' }}>Điện thoại: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem>
                                <ListContent>
                                    <ListHeader style={{ float: 'right' }}>Thời điểm hoàn tất: </ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />

                        </List>
                    </GridColumn>
                    <GridColumn>
                        <List >
                            <ListItem content={contentOrder?.orderTime ?? '...'} />
                            <br />
                            <ListItem content={contentOrder?.acceptTime ?? '...'} />
                            <br />
                            <br />
                            <ListItem content={contentOrder?.customer.contactName} />
                            <br />
                            <ListItem content={contentOrder?.customer.phone} />
                            <br />
                            <ListItem content={contentOrder?.finishedTime ?? '...'} />

                        </List>
                    </GridColumn>
                </Grid>
                <br />
                <h5 style={{ marginLeft: '10px' }}><strong>Danh sách mặt hàng thuộc đơn hàng</strong></h5>

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
                        {orderdetails.map((orderdetail, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{orderdetail.product.productName}</TableCell>
                                <TableCell>cái</TableCell>
                                <TableCell>{orderdetail.quantity}</TableCell>
                                <TableCell>{orderdetail.salePrice}</TableCell>
                                <TableCell>{orderdetail.quantity * orderdetail.salePrice}</TableCell>
                                <TableCell>
                                    {countDetail && countDetail !== 1 && contentOrder?.statusID === 1 && (
                                        <Button
                                            size='mini'
                                            color="red"
                                            floated='right'
                                            icon='trash alternate'
                                            onClick={() => handleDelete(orderdetail.id)}
                                        />
                                    )}
                                    {contentOrder &&
                                        (contentOrder.statusID === 1) && (
                                            <Button size='mini' color="blue" floated='right' icon='edit' onClick={() => handleButtonClick(orderdetail)} />
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <Confirm
                        header='Cập nhật chi tiết đơn hàng'
                        open={open}
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                        size='tiny'
                        color='red'
                        style={{
                            top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: 'auto', background: "white"
                        }}
                        content={
                            editingOrderDetail ? (
                                <Form style={{ margin: '20px' }}>
                                    <Grid style={{ margin: '20px' }}>
                                        <GridRow>
                                            <strong>Tên mặt hàng: {editingOrderDetail.product.productName}</strong>
                                        </GridRow>
                                        <GridRow>
                                            <strong>Đơn vị tính: cái</strong>
                                        </GridRow>
                                    </Grid>
                                    <Grid columns={2}>
                                        <GridRow style={{ marginLeft: '20px' }}>
                                            <GridColumn width={3} >
                                                <strong>Gía:</strong>
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <strong>Số lượng</strong>
                                            </GridColumn>
                                            <GridColumn width={12}>
                                                <Form.Input placeholder='1000000' width={16} value={editingOrderDetail.salePrice.toString()} />
                                                <Form.Input placeholder='0' type='number' min='1' width={16} value={editingOrderDetail.quantity.toString()}
                                                    onChange={(event) => setEditingOrderDetail({ ...editingOrderDetail, quantity: parseInt(event.target.value) || 0 })}
                                                />
                                            </GridColumn>
                                        </GridRow>
                                    </Grid>
                                </Form>
                            ) : null
                        }
                    />
                </Table>
            </Segment>
        </>
    );
})
