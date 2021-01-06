/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

// Loading Polyfills:
import "./polyfills"
import * as buffer from 'buffer';
// Load NPM modules:
import * as _ from "lodash";
import * as $ from "jquery";

import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import * as ReactDOM from "react-dom";
import * as React from "react";

// import {NodeRSA} from "node-rsa";
import * as NodeRSA from "node-rsa";

// import * as NodeRSA from "./rsa";

// Load Style:
import "./style/index.scss";

// Import my modules:
import {bindToWindow} from "./my_utils";
import {AppRoot} from "./app-root";
import "./client/client"
// import "./client/identities/manager"
import { NavBar } from "./UI/navbar/navbar";


// Handling Cordova Listener:
document.addEventListener('deviceready', ()=>{
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}, false);

// ===== Setting Up App: =====

// Declaring window extensions:
declare global {
    interface Window {
        app_root_elem: HTMLElement; 
        appRoot: React.FunctionComponentElement<AppRoot>;
        pane_renderers: any;
    }
}

window.app_root_elem = document.getElementById("app");
window.appRoot = <AppRoot />;

ReactDOM.render(window.appRoot, window.app_root_elem);

