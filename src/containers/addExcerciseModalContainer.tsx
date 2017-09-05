import { connect } from "react-redux";

import * as Models from "../models";
import AddExcerciseModal, { INewExcercise } from "../components/addExcerciseModal";
import { hideAddExcerciseBox, tryAddExcercise } from "../actions";

const mapStateToProps = (state: Models.DrumExcerciseStore, ownProps) => {
    return {
        active: state.uiState.showAddExcericeModal
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCancel: () => {
            dispatch(hideAddExcerciseBox());
        },
        onConfirm: (localState: INewExcercise) => {
            dispatch(tryAddExcercise(localState));
            dispatch(hideAddExcerciseBox());
        }
    }
};

const AddExcerciseModalContainer: any = connect(mapStateToProps, mapDispatchToProps)(AddExcerciseModal);

export default AddExcerciseModalContainer;