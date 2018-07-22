import { AuthenticationManager } from "./services/authentication";
import { INewExcercise } from "./components/addExcerciseModal";
import { ExcerciseModel } from "./models";
import { addExcercise, deleteExcercise, completeExcerciseLocal, completeExcercise, updateExcercise, receiveExcercises } from "./actions";

let authenticationManager: AuthenticationManager;

export function appStart() {
    return function(dispatch) {
        authenticationManager = new AuthenticationManager(dispatch);
    };
}

export function appEnd() {
    return function(dispatch) {
        // unexpected.
        if(!authenticationManager) {
            return;
        }

        authenticationManager.stopListening();
    }
}

export function tryLogOut() {
    return function(dispatch) {
        authenticationManager.logOut().then(() => {
            console.log('signed out lol');
        });
    };
}

export function tryAddExcercise(excercise: INewExcercise) {
    return function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            const newExcercise = new ExcerciseModel("" + new Date().getTime(), excercise.name, excercise.bpm, excercise.time_signature, excercise.increment, [], true);
            dispatch(addExcercise(newExcercise));
        }
        else { // save it to database
            const url = "api";
            let headers = {
                "Content-Type": "application/json"
            };
            let config = {
                method: "PUT",
                headers: headers,
                body: JSON.stringify({ user: "Feiyang Chen", excercise })
            };
            return fetch(url, config).then(response => response.json())
                .then(json => {
                    console.log("added excercise - " + JSON.stringify(json));
                    const newExcercise = json ? json.excercise : undefined;
                    if (newExcercise) {
                        dispatch(addExcercise(newExcercise));
                    }
                })
                .catch(() => {
                    console.log("error adding excercise!");
                });
        }
    };
}

export function tryDeleteExcercise(id: string) {
    return function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(deleteExcercise(id));
        }
        else {
            const url = "api/delete";
            const headers = {
                "Content-Type": "application/json"
            };
            const config = {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ user: "Feiyang Chen", id })
            };
            return fetch(url, config).then(response => response.json())
                .then(json => {
                    console.log("deleted excercise - " + JSON.stringify(json));
                    dispatch(deleteExcercise(id));
                })
                .catch(() => {
                    console.log("error updating excercise!");
                });
        }
    };
}

export function tryCompleteExcercise(excercise_id) {
    return function (dispatch) {

        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(completeExcerciseLocal(excercise_id));
        }
        else { // prod
            let url = "api/complete";
            let headers = {
                "Content-Type": "application/json"
            };
            let config = {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ user: "Feiyang Chen", id: excercise_id, date: new Date() })
            };
            return fetch(url, config).then((response) => response.json())
                .then((json) => {
                    dispatch(completeExcercise(json && json.excercises && json.excercises[0]));
                })
                .catch(() => {
                    console.log("error completing excercise!");
                })
        }
    }
};

export function tryUpdateExcercise(excercise: ExcerciseModel) {
    return function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(updateExcercise(excercise));
        }
        else {
            const url = "api/update";
            let headers = {
                "Content-Type": "application/json"
            };
            let config = {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ user: "Feiyang Chen", excercise })
            };
            return fetch(url, config).then(response => response.json())
                .then(json => {
                    console.log("updated excercise - " + JSON.stringify(json));
                    dispatch(updateExcercise(excercise));
                })
                .catch(() => {
                    console.log("error updating excercise!");
                });
        }
    };
}

export function fetchExcercises() {
    return function (dispatch) {
        let url = "api?user=" + encodeURIComponent("Feiyang Chen");
        return fetch(url).then(response => response.json()).then(json => {
            dispatch(receiveExcercises(json ? json.excercises : null));
            console.log(json);
        });
    };
}
