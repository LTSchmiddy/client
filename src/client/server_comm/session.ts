import * as NodeRSA from "node-rsa";
import "../client";
import {Identity} from "../identities/identity";
import {IdentityManager} from "../identities/id_manager";
import {Server, IServerMessage} from "./server";

import {ServerMessageTypes} from "./messaging";

import * as globals from "src/globals";
import "src/my_utils";
import { bindToWindow } from "src/my_utils";

export class Session {
    server: Server;
    identity: Identity;
    client_key: NodeRSA;
    server_key: NodeRSA;

    constructor(server: Server, identity: Identity, is_new=true){
        this.server = server;
        this.identity = identity;

        this.client_key = new NodeRSA({b: globals.keysize});
        this.server_key = new NodeRSA({b: globals.keysize});

        if (is_new) {
            this.create_new();
        }
    }

    get_public_key(): string {
        return this.client_key.exportKey(globals.key_pub_format);
    }

    get_private_key(): string {
        return this.client_key.exportKey(globals.key_format);
    }

    create_new() {
        this.client_key.generateKeyPair();
    }

    async establish_with_server() {
        let message: IServerMessage = {
            type: ServerMessageTypes["request_new_session"],
            content: "",
            args: {
                user_id_key: this.identity.get_public_key(),
                user_session_key: this.get_public_key(),
            },
            user_id: this.identity.get_public_key()
        }

        let result = await this.server.send_request(message);
        console.log(result);
    }
    
}

bindToWindow("Session", Session);