import * as React from "react";
import "react-dom";

import {NavBar} from "./UI/navbar/navbar"
import {bindToWindow, bWindow} from "./my_utils";

// import {PaneBase} from "./UI/panes/panes_base"
import {ChatView} from "./UI/panes/chat/chat-main"
import {IdentityManagerView} from "./UI/panes/identity/identity-manager"



export class AppRoot extends React.Component {

    render() {
        return (
            <div className="view-parent">
                <NavBar />
                <MainView />
            </div>
        )
    }
}


let pane_renderers: any = {
    'ChatView': (key: string, props: any) => {
        return <ChatView key={key} pkey={key} />;
    },
    'IdentityManager': (key: string, props: any) => {
        return <IdentityManagerView key={key} pkey={key} />;
    }
};

bindToWindow("pane_renderers", pane_renderers);

export function add_pane(name: string, fn: Function) {
    bWindow().pane_renderers[name] = fn;
}

// add_pane('ChatView', (props: any) => {
//     return <ChatView />;
// });

interface IMainViewState {
    ptypes: IPaneContainerState[];
}
class MainView extends React.Component<any, IMainViewState> {

    constructor(props: any) {
        super(props);

        this.state = {ptypes: [
            {ptype:'IdentityManager', pprops:null, pkey: null},
            {ptype:'ChatView', pprops:null, pkey: null},
        ]};
    }

    render() {
        let pane_comps: JSX.Element[] = [];

        for (let i = 0; i < this.state.ptypes.length; i++) {
            let pstate = this.state.ptypes[i];
            pstate.pkey = "key-MainView-" + i.toString();

            let container = <PaneContainer key={pstate.pkey} pkey={pstate.pkey} ptype={pstate.ptype} pprops={pstate.pprops} />
            pane_comps.push(container);
        }

        return (
            <div className="main-view">
                {pane_comps}
            </div>
        )
    }
}


// Pane Container:
interface IPaneContainerState {
    pkey: string;
    ptype: string;
    pprops: any;
}
class PaneContainer extends React.Component<IPaneContainerState, IPaneContainerState> {

    constructor (props: any) {
        super(props);
        this.state = {pkey: props.pkey+"-container", ptype: props.ptype, pprops: props.pprops};
        
    }

    render_pane(): any {
        // return pane_renderers[p_cname](props);
        return pane_renderers[this.state.ptype](this.state.pkey+"-"+this.state.ptype, this.state.pprops)
    }

    render () {
        // this.pstate.pkey;
        
        return (
            <div className="pane-container" key={this.state.pkey}>
                <div className="pane-parent">
                    {this.render_pane()}
                </div>
                
                <div key={this.state.pkey+"-controller"} className="pane-controller">
                    {this.state.ptype}
                </div>
            </div>

        );
    }
}
