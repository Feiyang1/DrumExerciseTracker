import * as React from "react";
import * as ReactDOM from "react-dom";

import AppBar from "react-toolbox/lib/app_bar";
//const style = require<any>("react-toolbox/lib/app_bar/theme.scss");

import data from "./data";
import ExcerciseList from "./components/excerciseList";

ReactDOM.render(
    <div>
        <AppBar title="Drum Pad"/>
        <ExcerciseList excercises={data}/>
    </div>,
    document.getElementById("example")
);