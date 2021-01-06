import * as NodeRSA from "node-rsa";
import "../client";
import {Identity} from "../identities/identity";
// import "plugins/cordova-plugin-nativestorage";
// import "plugins/cordova-plugin-file";

import "src/my_utils";
import { bindToWindow } from "src/my_utils";
import * as globals from "src/globals";


export interface IServerMessage {
    type: number;
    args: any;
    content: string;
    user_id?: string;
    api_major?: number;
    api_minor?: number;
    api_build?: number;
}

export interface IJsonServer {
    address: string;

    pub_key: string;
    pub_format: NodeRSA.FormatPem;
    
    display_name: string;
    creation_timestamp: number;
} 

export class Server {
    address: string;

    pub_key: NodeRSA;
    pub_format: NodeRSA.FormatPem;
    
    display_name: string;
    creation_timestamp: number; 

    my_id: Identity;

    constructor () {
        this.address = "";
        
        this.display_name = "New Server";
        this.creation_timestamp = Date.now();

        this.pub_format = globals.key_pub_format;

        this.pub_key = new NodeRSA({b: globals.keysize});
    }

    get_public_key(): string {
        return this.pub_key.exportKey(this.pub_format);
    }

    encrypt(data: any, source_encoding: NodeRSA.Encoding = "utf8", encoding: NodeRSA.Encoding = "base64") {
        return this.pub_key.encrypt(data, <NodeRSA.Encoding>encoding, <NodeRSA.Encoding>source_encoding);
    }


    async send_request (message: IServerMessage) {        
        let encrypted_message = this.encrypt(message);


        if (!this.address.endsWith("/")) {
            this.address += "/";
        }

        let encrypted_reply = (await $.post(this.address + "api/", {message: encrypted_message})).response;

        if (encrypted_reply === "invalid") {
            return null;
        }

        let raw_reply = this.my_id.decrypt(encrypted_reply);
        console.log(raw_reply);
        let reply = JSON.parse(raw_reply);

        return reply;
    }

    // Serialization:
    jsonize(): IJsonServer {
        return {
            address: this.address,
            pub_key: this.pub_key.exportKey(this.pub_format),
            pub_format: this.pub_format,
            display_name: this.display_name,
            creation_timestamp: this.creation_timestamp
        }
    }

    stringify(): string {
        return JSON.stringify(this.jsonize());
    }

    dejsonize(json_data: IJsonServer) {
        this.pub_key = new NodeRSA({b: globals.keysize});
        
        this.address = json_data.address;
        this.pub_format = json_data.pub_format;
        this.pub_key.importKey(json_data.pub_key, this.pub_format);
        this.display_name = json_data.display_name;
        this.creation_timestamp = json_data.creation_timestamp;
    }

    destringify(json_string: string) {
        let loaded = <IJsonServer>JSON.parse(json_string);
        this.dejsonize(loaded);
    }
}

bindToWindow("Server", Server);