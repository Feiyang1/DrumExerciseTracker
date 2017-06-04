import * as React from "react";

import AppBar from "react-toolbox/lib/app_bar";
import VisibleExcerciseList from "../containers/visibleExcerciseList";
import Header from "./header";

const App: React.StatelessComponent<any> = ({ active, className, children, onClick }) => {
    return <div>
        <AppBar title="Drum Pad" />
        <Header />
        <VisibleExcerciseList />
    </div>
};

export default App;