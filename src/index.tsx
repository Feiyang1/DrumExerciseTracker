//import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import * as fetch from "isomorphic-fetch";

import { fetchExcercises } from "./actions";
import excerciseApp from "./reducers/excercises";
import AppBar from "react-toolbox/lib/app_bar";
import data from "./data";
import VisibleExcerciseList from "./containers/visibleExcerciseList";
import Header from "./components/header";
import * as Models from "./models";

let store = createStore<Models.DrumExcerciseStore>(excerciseApp, { excercises: data, visibilityFilter: "today" }, applyMiddleware(thunkMiddleware));

store.dispatch(fetchExcercises()).then(()=>{
    console.log("fetch success");
});

ReactDOM.render(
    <Provider store={store}>
        <div>
            <AppBar title="Drum Pad" />
            <Header />
            <VisibleExcerciseList />
        </div>
    </Provider>,
    document.getElementById("app")
);