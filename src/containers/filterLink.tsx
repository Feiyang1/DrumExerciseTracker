import { connect } from "react-redux";

import Filter from "../components/filter";
import * as Models from "../models";
import { setVisibilityFilter } from "../actions";
import { Filter as FilterEnum } from "../models/filters";

interface ownProps {
    filter: FilterEnum;
    className: string;
}

const mapStateToProps = (state: Models.DrumExcerciseStore, ownProps: ownProps) => {
    return {
        ...ownProps,
        active: ownProps.filter === state.visibilityFilter
    };
};

const mapDispatchToProps = (dispatch, ownProps: ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    }
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterLink;