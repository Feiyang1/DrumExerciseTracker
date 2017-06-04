import * as fetch from "isomorphic-fetch";
export const ADD_EXCERCISE = "ADD_EXCERCISE";

export function addExcercise(excercise) {
    return {
        type: ADD_EXCERCISE,
        excercise 
    };
};

export const DELETE_EXCERCISE = "DELETE_EXCERCISE";
export function deleteExcercise(excercise_id) {
    return {
        type: DELETE_EXCERCISE,
        id: excercise_id
    };
};

export function tryCompleteExcercise(excercise_id) {
    return function (dispatch) {
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
};

export const COMPLETE_EXCERCISE = "COMPLETE_EXCERCISE";
export function completeExcercise(excercise) {
    return {
        type: COMPLETE_EXCERCISE,
        excercise
    };
}

export const RECEIVE_EXCERCISES = "RECEIVE_EXCERCISES";
export function receiveExcercises(json) {
    return {
        type: RECEIVE_EXCERCISES,
        excercises: json
    }
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

export const SET_VISIBILITYFILTER = "SET_VISIBILITYFILTER";
export function setVisibilityFilter(filter) {
    return {
        type: SET_VISIBILITYFILTER,
        filter
    };
}