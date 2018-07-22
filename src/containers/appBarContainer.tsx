import { connect } from "react-redux";

import AppBar from "../components/appBar";
import { showDialog, hideDialog } from "../actions";
import AddExcerciseModal, { INewExcercise } from "../components/addExcerciseModal";
import { tryAddExcercise } from "../thunks";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(showDialog({
                component: AddExcerciseModal,
                props: {
                    onCancel: () => {
                        dispatch(hideDialog());
                    },
                    onConfirm: (localState: INewExcercise) => {
                        dispatch(tryAddExcercise(localState));
                        dispatch(hideDialog());
                    }
                }
            }));
        }
    }
};

const AppBarContainer = connect(null, mapDispatchToProps)(AppBar);

export default AppBarContainer;