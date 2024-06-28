import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { observer } from "mobx-react-lite";
import {
    CardHeader,
    CardGroup,
    CardContent,
    Button,
    Card,
    Image,
    FormGroup,
    Form,
    FormField,
    Segment,
    Icon,
    Message,
    TableFooter,
    TableRow,
    TableHeaderCell,
    Menu,
    MenuItem,


} from 'semantic-ui-react';

export default observer(function EmployeeList() {
    const { employeeStore } = useStore();
    const { employees, loadEmployee, errorStore, pageCount, pageEmployee } = employeeStore;
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchEmployee') || '');
    const [page, setPage] = useState(parseInt(localStorage.getItem('pageEmployee') || '1', 10));

    const pageSize = 9;

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearchTerm(value);
        localStorage.setItem('searchEmployee', value);
        setPage(1);
    }
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            loadEmployee(searchTerm, page, pageSize);

        } else {
            loadEmployee('', page, pageSize);
        }

    }, [searchTerm, page, loadEmployee]);


    useEffect(() => {
        if (searchTerm.trim() !== '') {
            pageEmployee(pageSize, searchTerm);

        } else {
            pageEmployee(pageSize, '');
        }

    }, [pageEmployee, pageSize, searchTerm]);

    useEffect(() => {
        localStorage.setItem('pageEmployee', page.toString());
    }, [page]);

    return (
        <>
            {errorStore ?
                (errorStore == true) && (
                    <> <Message
                        error
                        header='Can not access'
                        content='You do not have permission to access this page!'
                    />

                    </>

                ) : (
                    <>
                        <Segment clearing color={"blue"}>
                            <Form>
                                <FormGroup>
                                    <FormField width={15}>
                                        <input placeholder='Nhập tên nhân viên' value={searchTerm}
                                            onChange={handleSearchChange} />
                                    </FormField>
                                    <Button size='small' color="blue" content='Thêm' as={NavLink} to='/createemployee' />
                                </FormGroup>
                            </Form>
                            <CardGroup>
                                {employees.map(employee => (
                                    <Card key={employee.id} style={{ width: '32%', display: 'flex', flexDirection: 'row' }} color='blue'>

                                        <Image src={employee.photo || 'https://localhost:44309/Images/Employees/20240519053405.jpg'} wrapped ui={false}
                                            style={{ width: '20%', height: '20px', margin: '15px' }} />
                                        <CardContent >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <CardHeader style={{ color: 'rgb(83 162 196)', fontSize: '18px' }}>{employee.fullName}</CardHeader>
                                            </div>
                                            <strong><Icon name='mail' /> </strong> {employee.email}
                                            <br />
                                            <strong><Icon name='address card' />  </strong>{employee.address}
                                            <br />
                                            <strong><Icon name='phone volume' />  </strong>{employee.phone}
                                            <br />
                                            <strong><Icon name='birthday cake' />  </strong>{employee.birthDate.toString()}
                                            <br />

                                            <Button size='mini' as={Link}
                                                to={`/employeeDetail/${employee.id}`} icon='delete' />
                                            <Button size='mini' as={Link}
                                                to={`/updateemployee/${employee.id}`} icon='edit' />
                                        </CardContent>


                                    </Card>
                                ))}
                            </CardGroup>
                            <br />
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
                )}


        </>
    );
})
