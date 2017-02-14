import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import data from "./data";
import Excercise from "./components/excercise";

ReactDOM.render(
    <MuiThemeProvider>
        <Excercise model={data[0]}/>
    </MuiThemeProvider>,
    document.getElementById("example")
);