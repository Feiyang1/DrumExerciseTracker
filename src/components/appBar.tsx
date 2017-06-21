import * as React from "react";

import AppBar from "react-toolbox/lib/app_bar";
import FontIcon from "react-toolbox/lib/font_icon";

const myAppBar: React.StatelessComponent<any> = ({onClick}) => {
    return <AppBar title="Drum Pad" rightIcon={<FontIcon value="add" />} onRightIconClick={onClick}/>;
};

export default myAppBar;