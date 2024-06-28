import { makeAutoObservable, reaction } from "mobx";


export default class CommonStore {

    token: string | null = localStorage.getItem('jwt');
    user: string | null = localStorage.getItem('account');
    id: string | null = localStorage.getItem('id');
    photo: string | null = localStorage.getItem('photo');
    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token)
                } else {
                    localStorage.removeItem('jwt');
                }
            }
        )
    }
    setToken = (token: string | null) => {
        console.log("token", token);
        if (token) localStorage.setItem('jwt', token);
        this.token = token;
    }
    setAccount = (user: string | null) => {
        if (user) {
            localStorage.setItem('account', user);
        }
    }
    setId = (id: string | null) => {
        if (id) {
            localStorage.setItem('id', id);
        }
    }
    setPhoto = (photo: string | null) => {
        if (photo) {
            localStorage.setItem('photo', photo);
        }
    }
}
