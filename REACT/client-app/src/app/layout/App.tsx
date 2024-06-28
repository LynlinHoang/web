import React, { useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  return (
    <>

      {!isLoginPage && (
        <>
          <NavBar />
          <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
                <Sidebar />
              </Grid.Column>
              <Grid.Column width={13} style={{ marginTop: '1em' }}>
                <Outlet />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      )}
      {isLoginPage && <Outlet />}
    </>
  );
}

export default observer(App);
