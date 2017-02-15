import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import data from "./data";
import Excercise from "./components/excercise";

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <div>
        <AppBar title="Drum Pad"
        iconElementLeft={<div></div>}
        />
        {
            data.map((excercise)=>{
                return <Excercise model={excercise}/>
            })
        }
        </div>
    </MuiThemeProvider>,
    document.getElementById("example")
);