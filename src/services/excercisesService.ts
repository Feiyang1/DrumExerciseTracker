import { INewExcercise } from "../components/addExcerciseModal";
import { ExcerciseModel } from "../models";
import { AuthenticationManager } from "./authentication";

class ExcercisesService {
    constructor() {

    }

    async fetchExcercises(): Promise<any> {
        const idToken = await AuthenticationManager.getIdToken();
        const url = "api";
        const config = {
            method: "GET",
            headers: {
                token: idToken
            }
        };
        return fetch(url, config).then(response => response.json());
    }

    async addExcercies(excercise: INewExcercise): Promise<any> {
        const idToken = await AuthenticationManager.getIdToken();
        const url = "api";
        const headers = {
            "Content-Type": "application/json",
            token: idToken
        };
        const config = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({ excercise })
        };
        return fetch(url, config).then(response => response.json());
    }

    async deleteExcercise(id: string): Promise<any> {
        const idToken = await AuthenticationManager.getIdToken();
        const url = "api/delete";
        const headers = {
            "Content-Type": "application/json",
            token: idToken
        };
        const config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id })
        };
        return fetch(url, config).then(response => response.json());
    }

    async completeExcercise(id: string): Promise<any> {
        const idToken = await AuthenticationManager.getIdToken();
        const url = "api/complete";
        const headers = {
            "Content-Type": "application/json",
            token: idToken
        };
        const config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id, date: new Date() })
        };
        return fetch(url, config).then((response) => response.json());
    }

    async updateExcercise(excercise: ExcerciseModel): Promise<any> {
        const idToken = await AuthenticationManager.getIdToken();
        const url = "api/update";
        const headers = {
            "Content-Type": "application/json",
            token: idToken
        };
        const config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ excercise })
        };
        return fetch(url, config).then(response => response.json());
    }
}

export default new ExcercisesService();