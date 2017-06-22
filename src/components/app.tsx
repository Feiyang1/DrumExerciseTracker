import * as React from "react";

import AppBar from "../containers/appBarContainer";
import VisibleExcerciseList from "../containers/visibleExcerciseList";
import Header from "./header";
import AddExcerciseModal from "../containers/addExcerciseModalContainer";

const App: React.StatelessComponent<any> = () => {
    return <div>
        <AppBar />
        <Header />
        <VisibleExcerciseList />
        <AddExcerciseModal />
    </div>
};

export default App;