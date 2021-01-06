import * as NodeRSA from "node-rsa";
import "../client";
// import "plugins/cordova-plugin-nativestorage";
// import "plugins/cordova-plugin-file";

import "src/my_utils";

import {Identity, IJsonIdentity} from "./identity";
import * as _ from "lodash";
import { bindToWindow } from "src/my_utils";

export interface IIdentityDict {
    [key: string]: Identity
}
export class IdentityManager {
    
    storage_key: string;
    ids: Identity[];

    selected_id_index: number;

    constructor(storage_key: string) {
        this.storage_key = storage_key;

        this.ids = [];
        console.log("and another one...");

        this.selected_id_index = 0;
    }

    selected_id(): Identity | null{
        if (this.ids.length === 0) {
            return null;
        }

        return this.ids[this.selected_id_index];
    }

    create_new() {
        let new_id = new Identity(true);
        this.ids.push(new_id);
    }

    delete_key(index: number) {
        this.ids.splice(index);
    }

    // Serialization:
    jsonize(): IJsonIdentity[] {
        let retVal: IJsonIdentity[] = [];

        _.forEach(this.ids, (identity, key) => {

            retVal.push(identity.jsonize());
        });

        return retVal;
    }

    save() {
        window.NativeStorage.setItem(this.storage_key, JSON.stringify(this.jsonize()));
    }

    dejsonize(json_data: IJsonIdentity[]) {
        this.ids = [];

        json_data.forEach((data, index)=>{
            let new_id = new Identity();
            new_id.dejsonize(data);

            this.ids.push(new_id);
        });
    }

    load() {
        window.NativeStorage.getItem(this.storage_key, (loaded: string)=>{
            this.dejsonize(JSON.parse(loaded));
        });
    }
}


export let idMan = new IdentityManager("IdentityManager_Instance");

document.addEventListener('deviceready', ()=>{
    idMan.load();
}, false);

bindToWindow("idMan", idMan);

