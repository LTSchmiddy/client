import * as React from "react";
import "react-dom";
import parse from "html-react-parser";

// import {add_pane} from "src/app-root";
import { PaneBase, IPaneBaseProps } from "../panes_base";
import {idMan} from "src/client/identities/id_manager";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class IdentityManagerView extends PaneBase {

        constructor(props: any) {
            super(props);
        }
    
        render () {
            // this.chat_input = (<ChatInput/>);
    
            return (
                <div key={this.panekey} className={"identity-manager"}>
                    
                </div>
            );
        }
    }