import { connect } from "react-redux";

import AppBar from "../components/appBar";
import { showAddExcerciseBox } from "../actions";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(showAddExcerciseBox());
        }
    }
};

const AppBarContainer = connect(null, mapDispatchToProps)(AppBar);

export default AppBarContainer;