import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import './style.css';
import { useStore } from '../stores/store';

export default function NavBar() {
    const { accountStore } = useStore();
    const { logout } = accountStore;
    const userName = localStorage.getItem('account') || 'null';
    const photo = localStorage.getItem('photo') || 'null';
    function handleAccept() {
        logout();
    }

    return (
        <Menu inverted fixed='top' className='gradient-menu'>
            <Menu.Item>
                <h4>LYNLYN</h4>
            </Menu.Item>
            <Menu.Item position='right'>
                <Dropdown text={userName} pointing='top right' className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item text='Profile' as={NavLink} to='/profile' />
                        <Dropdown.Item text='Settings' as={NavLink} to='/settings' />
                        <Dropdown.Divider />
                        <Dropdown.Item text='Sign Out' onClick={handleAccept} />
                    </Dropdown.Menu>
                </Dropdown>
                <Image
                    src={photo || 'https://localhost:44309/Images/Employees/20240519053405.jpg'}
                    size='mini'
                    circular
                    floated='right'
                />
            </Menu.Item>
        </Menu>
    );
}
