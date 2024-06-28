import { makeAutoObservable, runInAction } from "mobx";
import { Category } from "../models/category";
import agent from "../api/agent";

export default class ActivityStore {
    activities: Category[] = [];
    activityRegistry = new Map<string, Category>();
    selectedActivity: Category | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    errorStore = false;
    isused = false;
    pageCount = 1;


    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async (CategoryName: string, page: number, pageSize: number) => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list(CategoryName, page, pageSize);
            this.activities = activities as Category[];
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createActivity = async (activity: Category) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    updateActivity = async (activity: Category) => {
        try {
            this.loading = true;
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;

        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.setLoadingInitial(true)
            try {
                activity = await agent.Activities.details(id);
                this.activityRegistry.set(id, activity);
                this.selectedActivity = activity;
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    isUsedActivity = async (id: string) => {
        this.loading = true;
        try {
            const checkIsused = await agent.Activities.isUsed(id);
            runInAction(() => {
                this.isused = checkIsused as boolean;
                this.setLoadingInitial(true);
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                console.log(error);
                this.setLoadingInitial(false);
            });
        }
    }

    pageActivity = async (pageSize: number, searchTerm: string) => {
        this.loading = true;
        try {
            const page = await agent.Activities.pagecount(pageSize, searchTerm);
            runInAction(() => {
                this.pageCount = page as number;
                this.setLoadingInitial(true);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                console.log(error);
                this.setLoadingInitial(false);
            });
        }
    }
}
