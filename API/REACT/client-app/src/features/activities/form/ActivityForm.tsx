import React, { ChangeEvent, useEffect, useState } from "react";
import { Segment, Form, Button, FormField } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Category } from "../../../app/models/category";


export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputError, setInputError] = useState<string | null>(null);
    const [activity, setActivity] = useState<Category>({
        id: '',
        categoryName: '',
        description: '',
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    useEffect(() => {
        if (inputError) {
            const timer = setTimeout(() => {
                setInputError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [inputError]);
    function handleSubmit() {
        if (!activity.categoryName || !activity.description) {
            setInputError('Nhập đầy đủ thông tin');
            return;

        }
        if (!activity.id) {
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
            alert('Thêm thành công!');
        } else {
            updateActivity(activity).then(() => navigate(`/activities`));
            alert('Cập nhật thành công!')
        }
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
    return (
        <>

            <Segment clearing color={"blue"}>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <FormField>
                        <label>Tên loại hàng:</label>
                    </FormField>
                    <Form.Input placeholder='Category Name'
                        value={activity.categoryName}
                        name='categoryName'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Mô tả:</label>
                    </FormField>
                    <Form.Input
                        placeholder='Description'
                        value={activity.description}
                        name='description'
                        onChange={handleInputChange} />

                    {inputError && (
                        <p style={{ color: 'red' }}>{inputError}</p>
                    )}


                    <Button loading={loading} floated="right" positive type="submit" content="Lưu" />
                    <Button as={Link} to={'/activities'} floated="right" type='button' content='Quay lại' />
                </Form>
            </Segment>
        </>
    );
})
