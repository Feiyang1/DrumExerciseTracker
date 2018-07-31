import { INewExcercise } from "../components/addExcerciseModal";
import { ExcerciseModel } from "../models";
import { AuthenticationManager } from "./authentication";

class ExcercisesService {
    constructor() {

    }

    async fetchExcercises(): Promise<any> {
        const idToken = await AuthenticationManager.getIdToken();
        const url = "api?user=" + encodeURIComponent("Feiyang Chen");
        const config = {
            method: "GET",
            headers: {
                token: idToken
            }
        };
        return fetch(url, config).then(response => response.json());
    }

    addExcercies(excercise: INewExcercise): Promise<any> {
        const url = "api";
        const headers = {
            "Content-Type": "application/json"
        };
        const config = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({ user: "Feiyang Chen", excercise })
        };
        return fetch(url, config).then(response => response.json());
    }

    deleteExcercise(id: string): Promise<any> {
        const url = "api/delete";
        const headers = {
            "Content-Type": "application/json"
        };
        const config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ user: "Feiyang Chen", id })
        };
        return fetch(url, config).then(response => response.json());
    }

    completeExcercise(id: string): Promise<any> {
        const url = "api/complete";
        const headers = {
            "Content-Type": "application/json"
        };
        const config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ user: "Feiyang Chen", id, date: new Date() })
        };
        return fetch(url, config).then((response) => response.json());
    }

    updateExcercise(excercise: ExcerciseModel): Promise<any> {
        const url = "api/update";
        let headers = {
            "Content-Type": "application/json"
        };
        let config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ user: "Feiyang Chen", excercise })
        };
        return fetch(url, config).then(response => response.json());
    }
}

export default new ExcercisesService();