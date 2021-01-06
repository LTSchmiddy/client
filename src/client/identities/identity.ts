import * as NodeRSA from "node-rsa";
import "../client";
// import "plugins/cordova-plugin-nativestorage";
// import "plugins/cordova-plugin-file";

import { Server, IJsonServer } from "../server_comm/server";

import "src/my_utils";
import { bindToWindow } from "src/my_utils";

import * as globals from "src/globals";
import * as _ from "lodash";


export interface IJsonIdentity {
    id_key: string;

    format: NodeRSA.FormatPem;
    pub_format: NodeRSA.FormatPem;
    
    display_name: string;
    creation_timestamp: number;

    servers: IJsonServer[];
} 

export class Identity {
    id_key: NodeRSA;
    format: NodeRSA.FormatPem;
    pub_format: NodeRSA.FormatPem;
    
    display_name: string;
    creation_timestamp: number; 

    servers: Server[];

    constructor (is_new: boolean = false) {
        this.display_name = "New Name";
        this.creation_timestamp = Date.now();

        this.format  = globals.key_format;
        this.pub_format = globals.key_pub_format;

        this.id_key = new NodeRSA({b: globals.keysize});
        
        this.servers = [];

        if (is_new) {
            this.id_key.generateKeyPair();
        }
    };

    get_public_key(): string {
        return this.id_key.exportKey(this.pub_format);
    }

    get_private_key(): string {
        return this.id_key.exportKey(this.format);
    }

    encrypt(data: any, source_encoding: NodeRSA.Encoding = "utf8", encoding: NodeRSA.Encoding = "base64") {
        return this.id_key.encrypt(data, <NodeRSA.Encoding>encoding, <NodeRSA.Encoding>source_encoding);
    }

    decrypt(data: string, encoding: NodeRSA.Encoding = "utf8") {
        let retVal = "";

        _.forEach(data, (i, index)=>{
            console.log()
            retVal += this.id_key.decrypt(i, <NodeRSA.Encoding>encoding);

        });
        console.log(retVal);
        return retVal;
    }


    jsonize_servers(): IJsonServer[] {
        let retVal: IJsonServer[] = [];

        this.servers.forEach((i, index) => {
            retVal.push(i.jsonize());
        });

        return retVal;
    }

    // ==== Serialization ==== :
    jsonize(): IJsonIdentity {
        return {
            id_key: this.id_key.exportKey(),
            format: this.format,
            pub_format: this.pub_format,
            display_name: this.display_name,
            creation_timestamp: this.creation_timestamp,
            servers: this.jsonize_servers()
        }
    }

    stringify(): string {
        return JSON.stringify(this.jsonize());
    }


    dejsonize_servers(json_data: IJsonServer[]) {
        json_data.forEach((i, index) => {
            let s = new Server();
            s.dejsonize(i)
            s.my_id = this;
            this.servers.push(s);
        });
    }

    dejsonize(json_data: IJsonIdentity) {
        this.id_key = new NodeRSA({b: globals.keysize});
        
        this.format = json_data.format;
        this.pub_format = json_data.pub_format;
        this.id_key.importKey(json_data.id_key, this.format);
        this.display_name = json_data.display_name;
        this.creation_timestamp = json_data.creation_timestamp;

        this.dejsonize_servers(json_data.servers);
    }

    destringify(json_string: string) {
        let loaded = <IJsonIdentity>JSON.parse(json_string);
        this.dejsonize(loaded);
    }
}

// Make accessible in dev console:
bindToWindow("Identity", Identity);
bindToWindow("NodeRSA", NodeRSA);

