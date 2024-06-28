import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, FormField, Form, FormGroup, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TableFooter, Menu, MenuItem, Icon } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, NavLink, } from "react-router-dom";
export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { activities, loadActivities, pageActivity, pageCount } = activityStore;
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
    const [page, setPage] = useState(parseInt(localStorage.getItem('page') || '1', 10));
    const pageSize = 3;

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearchTerm(value);
        localStorage.setItem('searchTerm', value);
        setPage(1);
    }

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            loadActivities(searchTerm, page, pageSize);

        } else {
            loadActivities('', page, pageSize);
        }

    }, [page, searchTerm, loadActivities]);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            pageActivity(pageSize, searchTerm);

        } else {
            pageActivity(pageSize, '');
        }
    }, [pageActivity, pageSize, searchTerm]);

    useEffect(() => {
        localStorage.setItem('page', page.toString());
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
                        <Button size='small' color="blue" content='Thêm' as={NavLink} to='/createActivities' />
                    </FormGroup>
                </Form>
                <Table celled unstackable style={{ width: '100%' }}>

                    <TableHeader >
                        <TableRow style={{ color: 'blue' }}>
                            <TableHeaderCell >Tên loại hàng</TableHeaderCell>
                            <TableHeaderCell >Mô tả</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody >
                        {activities.map(categorie => (
                            <TableRow key={categorie.id}>
                                <TableCell>{categorie.categoryName}</TableCell>
                                <TableCell>{categorie.description}</TableCell>
                                <TableCell>


                                    <Button size='mini' color="red" as={Link} to={`/activities/${categorie.id}`} floated='right' icon='delete' />
                                    <Button size='mini' color="blue" as={Link} to={`/manage/${categorie.id}`} floated='right' icon='edit' />
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