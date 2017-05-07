import { connect } from "react-redux";

import Filter from "../components/filter";
import * as Models from "../models";
import { setVisibilityFilter } from "../actions";

const mapStateToProps = (state: Models.DrumExcerciseStore, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    }
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterLink;