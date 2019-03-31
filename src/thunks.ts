import { AuthenticationManager } from "./services/authentication";
import { INewExcercise } from "./components/addExcerciseModal";
import { ExcerciseModel } from "./models";
import { addExcercise, deleteExcercise, completeExcerciseLocal, completeExcercise, updateExcercise, receiveExcercises, loggedIn } from "./actions";
import excercisesService from "./services/excercisesService";

let authenticationManager: AuthenticationManager;

export function appStart() {
    return function (dispatch) {
        authenticationManager = new AuthenticationManager(dispatch);
    };
}

export function appEnd() {
    return function (dispatch) {
        // unexpected.
        if (!authenticationManager) {
            return;
        }

        authenticationManager.stopListening();
    }
}

export function tryLogOut() {
    return function (dispatch) {
        authenticationManager.logOut().then(() => {
            console.log('signed out lol');
        });
    };
}

export function tryAddExcercise(excercise: INewExcercise) {
    return async function (dispatch) {
        if (process.env.NODE_ENV === "prod") { // dev
            const newExcercise = new ExcerciseModel("" + new Date().getTime(), excercise.name, excercise.bpm, excercise.time_signature, excercise.increment, [], true);
            dispatch(addExcercise(newExcercise));
        }
        else { // save it to database
            try {
                const addedExcercise = await excercisesService.addExcercies(excercise);

                console.log("added excercise - " + JSON.stringify(addedExcercise));
                if (addedExcercise) {
                    dispatch(addExcercise(addedExcercise));
                }
            } catch (e) {
                console.log("error adding excercise! ", e);
            };
        }
    };
}

export function tryDeleteExcercise(id: string) {
    return async function (dispatch) {
        if (process.env.NODE_ENV === "prod") { // dev
            dispatch(deleteExcercise(id));
        }
        else {
            try {
                await excercisesService.deleteExcercise(id);
                console.log("deleted excercise - " + id);
                dispatch(deleteExcercise(id));
            } catch (e) {
                console.log("error deleting excercise!", e);
            };
        }
    };
}

export function tryCompleteExcercise(excercise: ExcerciseModel) {
    return async function (dispatch) {
        if (process.env.NODE_ENV === "prod") { // dev
            dispatch(completeExcerciseLocal(excercise.id));
        }
        else { // prod
            try {
                const response = await excercisesService.completeExcercise(excercise);
                dispatch(completeExcercise(response));
            } catch (e) {
                console.log("error completing excercise!", e);
            };
        }
    }
};

export function tryUpdateExcercise(excercise: ExcerciseModel) {
    return async function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(updateExcercise(excercise));
        }
        else {
            try {
                const response = await excercisesService.updateExcercise(excercise);
                console.log("updated excercise - " + JSON.stringify(response));
                dispatch(updateExcercise(excercise));
            } catch (e) {
                console.log("error updating excercise!", e);
            };
        }
    };
}

export function fetchExcercises() {
    return async function (dispatch) {
        try {
            const excercises: ExcerciseModel[] = await excercisesService.fetchExcercises();
            dispatch(receiveExcercises(excercises));
        } catch (e) {
            console.log("error getting excercise list!", e);
        }
    };
};

export function beforeLoggedIn() {
    return function (dispatch) {
        dispatch(fetchExcercises());
        dispatch(loggedIn());
    };
}

