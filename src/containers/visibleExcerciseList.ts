import { connect } from "react-redux"
import ExcerciseList from "../components/excerciseList"
import * as Models from "../models";
import { tryCompleteExcercise } from "../actions";

const getVisibleExcercises = (excercises: Models.ExcerciseModel[], visibilityFilter) => {
    let visibleExcercises = [];

    excercises.forEach(excercise => {
        switch (visibilityFilter) {
            case "today":
                if (excercise.active) {
                    let today = new Date();// todo - today to be sent from server;
                    let lastRecord = excercise.history[excercise.history.length - 1]
                    let lastDate = lastRecord ? lastRecord.date : "";

                    if (lastDate === "" || !isSameDate(new Date(lastDate), today)) {// if the excercise has not been practiced today. {
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
            return (id) => {
                if(visibilityFilter === "today") {
                    dispatch(tryCompleteExcercise(id));
                }
            };
        }
    }
};

const VisibleExcerciseList: React.ComponentClass<{}> = connect(mapStateToProps, mapDispatchToProps)(ExcerciseList);

export default VisibleExcerciseList;