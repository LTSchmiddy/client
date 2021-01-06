import * as React from "react";
import "react-dom";
import parse from "html-react-parser";


export interface IPaneBaseProps {    
    pkey: string;
}

export class PaneBase extends React.Component<IPaneBaseProps, any> {
    panekey: string;
    constructor(props: IPaneBaseProps) {
        super(props);

        this.panekey = props.pkey;
    }

}