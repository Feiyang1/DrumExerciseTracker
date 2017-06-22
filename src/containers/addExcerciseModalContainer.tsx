import { connect } from "react-redux";

import * as Models from "../models";
import AddExcerciseModal from "../components/addExcerciseModal";

const mapStateToProps = (state: Models.DrumExcerciseStore, ownProps) => {
    return {
        active: state.uiState.showAddExcericeModal
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
};

const AddExcerciseModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddExcerciseModal);

export default AddExcerciseModalContainer;