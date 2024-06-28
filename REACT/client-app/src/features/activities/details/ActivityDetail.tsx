import React, { useEffect } from "react";
import { CardMeta, CardHeader, CardContent, Card, Button, Segment, FormField, } from 'semantic-ui-react';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams, useNavigate } from "react-router-dom";


export default observer(function ActivityDetails() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, deleteActivity, isUsedActivity, isused } = activityStore;
    const { id } = useParams();
    function handleActivityDelete(id: string) {
        deleteActivity(id).then(() => navigate(`/activities`));
    }

    useEffect(() => {
        if (id) {
            loadActivity(id);
            isUsedActivity(id);
        }

    }, [id, loadActivity, isUsedActivity])
    if (!activity) return null;
    return (
        <>

            <Segment clearing color={"blue"}>

                <FormField>
                    <strong>Tên loại hàng:</strong>
                </FormField>
                <CardHeader>{activity.categoryName}</CardHeader>
                <br />
                <FormField>
                    <strong>Mô tả:</strong>
                </FormField>
                <CardHeader>{activity.description}</CardHeader>
                {isused !== undefined &&
                    (!isused) && (
                        <Button floated="right" color='red' type="submit" content="Xóa" onClick={(e) => handleActivityDelete(activity.id)} />
                    )
                }
                <Button as={Link} to={'/activities'} floated="right" type='button' content='Quay lại' />
            </Segment>
        </>
    );
})