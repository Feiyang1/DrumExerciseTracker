import { connect } from "react-redux"
import ExcerciseList from "../components/excerciseList"
import * as Models from "../models";
import { showDialog, hideDialog } from "../actions";
import EditExcerciseModal from "../components/editExcerciseModal";
import DeleteExcerciseModal from "../components/deleteExcerciseModal";
import { tryCompleteExcercise, tryUpdateExcercise, tryDeleteExcercise } from "../thunks";
import { ExcerciseModel } from "../models";
import { getFirebaseNamespace } from "../services/firebaseService";

const getVisibleExcercises = (excercises: Models.ExcerciseModel[], visibilityFilter) => {
    let visibleExcercises = [];

    excercises.forEach(excercise => {
        switch (visibilityFilter) {
            case "today":
                if (excercise.active) {
                    let today = new Date();// todo - today to be sent from server;
                    let lastRecord = excercise.history[excercise.history.length - 1]
                    let lastDate = lastRecord ? lastRecord.date : "";
                    let lastDateJs = null;

                    const firebase = getFirebaseNamespace();
                    if (lastDate instanceof firebase.firestore.Timestamp) {
                        lastDateJs = lastDate.toDate();
                    } else { // legacy dates are in string format
                        lastDateJs = new Date(lastDate)
                    }

                    if (lastDate === "" || !isSameDate(lastDateJs, today)) {// if the excercise has not been practiced today. {
                        visibleExcercises.push(excercise);
                    }
                }
                break;
            case "active":
                if (excercise.active) {
                    visibleExcercises.push(excercise);
                }
                break;
            case "archive":
                if (!excercise.active) {
                    visibleExcercises.push(excercise);
                }
                break;
        }

    });

    return visibleExcercises;
}

const isSameDate = (date1: Date, date2: Date): boolean => {
    if (date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()) {
        return true;
    }
    return false;
}

const mapStateToProps = (state: Models.DrumExcerciseStore) => {
    return {
        excercises: getVisibleExcercises(state.excercises, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onExcerciseClick: (visibilityFilter) => {
            return (excercise: ExcerciseModel) => {
                if (visibilityFilter === "today") {
                    dispatch(tryCompleteExcercise(excercise));
                }
            };
        },
        onExcerciseEditClick: (excercise: Models.ExcerciseModel) => {
            console.log("edit " + excercise.id);
            dispatch(showDialog({
                component: EditExcerciseModal,
                props: {
                    onCancel: () => {
                        dispatch(hideDialog());
                    },
                    onConfirm: (updatedExercise) => {
                        dispatch(tryUpdateExcercise(updatedExercise));
                        dispatch(hideDialog());
                    },
                    excercise
                }
            }));
        },
        onExcerciseDeleteClick: (id: string) => {
            console.log("delete " + id);
            dispatch(showDialog({
                component: DeleteExcerciseModal,
                props: {
                    onCancel: () => {
                        dispatch(hideDialog());
                    },
                    onConfirm: (id) => {
                        dispatch(tryDeleteExcercise(id));
                        dispatch(hideDialog());
                    },
                    id
                }
            }));
        }
    }
};

const VisibleExcerciseList: React.ComponentClass<{}> = connect(mapStateToProps, mapDispatchToProps)(ExcerciseList);

export default VisibleExcerciseList;