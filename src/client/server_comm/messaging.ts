
import {IdentityManager} from "../identities/id_manager";
import {Identity} from "../identities/identity";

import {Server} from "./server";
import {Session} from "./session";


export class ServerMessenger {

    
    

}


export const ServerMessageTypes: Record<string, number> = {
    "command": 0,
    "request_new_session": 1
}

