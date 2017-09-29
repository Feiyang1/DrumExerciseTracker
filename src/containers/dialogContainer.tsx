import { connect } from "react-redux";

import * as Models from "../models";
import Dialog from "../components/dialog";

const mapStateToProps = (state: Models.DrumExcerciseStore, ownProps) => {
    return {
        ...state.dialog
    };
};

const DialogContainer: any = connect(mapStateToProps)(Dialog);

export default DialogContainer;