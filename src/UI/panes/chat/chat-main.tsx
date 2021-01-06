import * as React from "react";
import "react-dom";
import parse from "html-react-parser";

// import {add_pane} from "src/app-root";
import { PaneBase, IPaneBaseProps } from "../panes_base";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class ChatView extends PaneBase {

    constructor(props: any) {
        super(props);
    }

    render () {
        // this.chat_input = (<ChatInput/>);

        return (
            <div key={this.panekey} className={"chat-view"}>
                <MessagesViewHead /> 
                <MessagesView/>
                <ChatInput/>
            </div>
        );
    }
}

interface IMessagesViewHeadProps {}
interface IMessagesViewHeadState {
    Hello: string;
}

class MessagesViewHead extends React.Component<IMessagesViewHeadProps, IMessagesViewHeadState> {

    constructor(props: any) {
        super(props);
        this.state = {Hello: "Poop"}
    }
    render () {
        return (
            <div className="message-view-head">
                {this.state.Hello}
                {/* <button className="btn-danger" onClick={this.load_message}>{"load"}</button> */}
            </div>
        );
    }
    
    async load_message() {
        let new_state: any = await $.post("http://localhost:1776/api/");
        console.log(new_state);
    }
}

class MessagesView extends React.Component {
    messages: string[];
    viewRef: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.messages = ["Hello", "Alex"];

        this.viewRef = React.createRef()
    }

    render () {
        let keyv = 0;
        let msgs = this.messages.map((msg => {
            return <ChatMessage key={(keyv++).toString()} msg_text={msg} />
        }));
        console.log(msgs);
        return (
            <div className="messages-view" ref={this.viewRef}>
                {msgs}
            </div>
        );
    }
}

function ChatMessage(props: any) {
    return (
        <div className="message">
            {props.msg_text}
        </div>
    );
}


class ChatInput extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render () {
        return (
            <div className="chat-input">
                <input className="input-field" />
                <button className="send-button btn-primary">{"Send"}</button>
            </div>
            
        );
    }
}