'use strict';

import * as vscode from 'vscode';
import {initConfigurationSample} from './initConfigurationSample';
import { initMiscConfiguration } from './initMiscConfiguration';

export function activate(context: vscode.ExtensionContext) {
	initConfigurationSample(context);
	initMiscConfiguration(context);
}



export function deactivate() {}