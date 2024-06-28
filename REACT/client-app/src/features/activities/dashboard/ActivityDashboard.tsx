import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./activityList";
import { observer } from "mobx-react-lite";


export default observer(function ActivityDashboard() {


    return (
        <ActivityList />
    );
})

