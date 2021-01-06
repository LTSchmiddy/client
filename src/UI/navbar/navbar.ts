import * as React from "react";
import parse from "html-react-parser";

import layout from "./navbar-layout.hbs";

export class NavBar extends React.Component {
    render () {
        return (
            parse(layout)
        )
    }
}
