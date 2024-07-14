import React, { ChangeEvent, useState } from "react";
import { Segment, Form, Button, FormField, Message, GridColumn, Grid, FormInput, FormGroup } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Login } from "../../../app/models/login";

export default observer(function LoginForm() {
    const { accountStore } = useStore();
    const { loginaccount } = accountStore;
    const [error, setError] = useState<string | null>(null);
    const [inputError, setInputError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [login, setLogin] = useState<Login>({
        userName: '',
        password: ''
    });
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value })
    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!login.password || !login.userName) {
            setInputError("Please enter both email and password.");
            return;
        }
        try {
            await loginaccount(login);
            navigate(`/home`);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setError("Email or password not found. Please try again.");
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '500px' }}>
                <Segment placeholder >
                    <Grid columns={1} relaxed='very' stackable  >
                        <GridColumn >
                            <Form onSubmit={handleSubmit}>
                                <FormInput
                                    icon='user'
                                    iconPosition='left'
                                    name='userName'
                                    value={login.userName}
                                    onChange={handleInputChange}
                                    placeholder='Username'
                                    label='Username'
                                />
                                <FormInput
                                    icon='lock'
                                    iconPosition='left'
                                    label='Password'
                                    name='password'
                                    value={login.password}
                                    onChange={handleInputChange}
                                    type='password'
                                    placeholder='Password'
                                />

                                <Button content='Login' primary />
                            </Form>
                            {inputError && (

                                <p style={{ color: 'red' }}>{inputError}</p>

                            )}
                            {error && (
                                <p style={{ color: 'red' }}>{error}</p>

                            )}
                        </GridColumn>


                    </Grid>
                </Segment>


            </div>
        </>
    );
});
