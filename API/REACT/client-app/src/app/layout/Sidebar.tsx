import React, { useState } from 'react';
import {
    SidebarPushable,
    Segment,
    ListItem,
    ListIcon,
    ListContent,
    ListHeader,
    ListList,
    List,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
    };

    const renderListIcon = (item: string) => {
        return selectedItem === item ? 'dot circle' : 'circle outline';
    };

    return (
        <SidebarPushable as={Segment} style={{ padding: '20px', marginTop: '5px', height: '200vh', background: 'linear-gradient(to bottom, rgb(147 185 204), rgb(83 162 196))' }}>
            <List>
                <ListItem>
                    <ListIcon name='folder' />
                    <ListContent>
                        <ListList>
                            <ListItem>
                                <ListIcon name='home' />
                                <ListContent>
                                    <ListHeader as={NavLink} to='/test' >Trang chủ</ListHeader>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem style={{ background: 'white', padding: '10px' }}>
                                <ListIcon name='folder' />
                                <ListContent>
                                    <ListHeader>Dữ liệu</ListHeader>
                                    <ListList style={{ margin: '5px' }}>
                                        <ListItem

                                            onClick={() => handleItemClick('activities')}
                                        >
                                            <ListIcon name={renderListIcon('activities')} />
                                            <ListContent as={NavLink} to='/activities'
                                                style={{ textDecoration: 'none' }}
                                                onMouseEnter={(e: any) => e.target.style.color = 'rgb(67, 127, 151)'}
                                                onMouseLeave={(e: any) => e.target.style.color = 'black'}
                                            >
                                                <ListHeader>Loại Hàng</ListHeader>
                                            </ListContent>
                                        </ListItem>
                                        <br />
                                        <ListItem

                                            onClick={() => handleItemClick('supplier')}
                                        >
                                            <ListIcon name={renderListIcon('supplier')} />
                                            <ListContent as={NavLink} to='/supplier'
                                                style={{ textDecoration: 'none' }}
                                                onMouseEnter={(e: any) => e.target.style.color = 'rgb(67, 127, 151)'}
                                                onMouseLeave={(e: any) => e.target.style.color = 'black'}
                                            >
                                                <ListHeader>Nhà Cung Cấp</ListHeader>
                                            </ListContent>
                                        </ListItem>
                                        <br />
                                        <ListItem

                                            onClick={() => handleItemClick('customer')}
                                        >
                                            <ListIcon name={renderListIcon('customer')} />
                                            <ListContent as={NavLink} to='/customer'
                                                style={{ textDecoration: 'none' }}
                                                onMouseEnter={(e: any) => e.target.style.color = 'rgb(67, 127, 151)'}
                                                onMouseLeave={(e: any) => e.target.style.color = 'black'}
                                            >
                                                <ListHeader>Khách Hàng</ListHeader>
                                            </ListContent>
                                        </ListItem>
                                        <br />
                                        <ListItem

                                            onClick={() => handleItemClick('shipper')}
                                        >
                                            <ListIcon name={renderListIcon('shipper')} />
                                            <ListContent as={NavLink} to='/shipper'
                                                style={{ textDecoration: 'none' }}
                                                onMouseEnter={(e: any) => e.target.style.color = 'rgb(67, 127, 151)'}
                                                onMouseLeave={(e: any) => e.target.style.color = 'black'}
                                            >
                                                <ListHeader>Người Giao hàng</ListHeader>
                                            </ListContent>
                                        </ListItem>
                                        <br />
                                        <ListItem

                                            onClick={() => handleItemClick('employee')}
                                        >
                                            <ListIcon name={renderListIcon('employee')} />
                                            <ListContent as={NavLink} to='/employee'
                                                style={{ textDecoration: 'none' }}
                                                onMouseEnter={(e: any) => e.target.style.color = 'rgb(67, 127, 151)'}
                                                onMouseLeave={(e: any) => e.target.style.color = 'black'}
                                            >
                                                <ListHeader>Nhân Viên</ListHeader>
                                            </ListContent>
                                        </ListItem>
                                        <br />
                                        <ListItem

                                            onClick={() => handleItemClick('product')}
                                        >
                                            <ListIcon name={renderListIcon('product')} />
                                            <ListContent as={NavLink} to='/product'
                                                style={{ textDecoration: 'none' }}
                                                onMouseEnter={(e: any) => e.target.style.color = 'rgb(67, 127, 151)'}
                                                onMouseLeave={(e: any) => e.target.style.color = 'black'}
                                            >
                                                <ListHeader>Mặt Hàng</ListHeader>
                                            </ListContent>
                                        </ListItem>
                                    </ListList>
                                </ListContent>
                            </ListItem>
                            <br />
                            <ListItem style={{ background: 'white', padding: '10px' }}>
                                <ListIcon name='folder' />
                                <ListContent>
                                    <ListHeader>Quản lý đơn hàng</ListHeader>
                                    <ListList>
                                        <br />
                                        <ListItem

                                            onClick={() => handleItemClick('order')}
                                        >
                                            <ListIcon name={renderListIcon('order')} />
                                            <ListContent as={NavLink} to='/order'
                                                style={{ textDecoration: 'none' }}
                                                onMouseEnter={(e: any) => e.target.style.color = 'rgb(67, 127, 151)'}
                                                onMouseLeave={(e: any) => e.target.style.color = 'black'}
                                            >
                                                <ListHeader>Danh mục đơn hàng</ListHeader>
                                            </ListContent>
                                        </ListItem>
                                        <br />
                                        <ListItem

                                            onClick={() => handleItemClick('cart')}
                                        >
                                            <ListIcon name={renderListIcon('cart')} />
                                            <ListContent as={NavLink} to='/cart'
                                                style={{ textDecoration: 'none' }}
                                                onMouseEnter={(e: any) => e.target.style.color = 'rgb(67, 127, 151)'}
                                                onMouseLeave={(e: any) => e.target.style.color = 'black'}
                                            >
                                                <ListHeader>Lập đơn hàng</ListHeader>
                                            </ListContent>
                                        </ListItem>
                                    </ListList>
                                </ListContent>
                            </ListItem>
                        </ListList>
                    </ListContent>
                </ListItem>
            </List>
        </SidebarPushable>
    );
}

export default Sidebar;
