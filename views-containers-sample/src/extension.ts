'use strict';

import * as vscode from 'vscode';
import { MyCustomContainerView1DataProvider } from './MyCustomContainerView1DataProvider';


export function activate(context: vscode.ExtensionContext) {
    const treeDataProvider = new MyCustomContainerView1DataProvider();  
    context.subscriptions.push(vscode.window.registerTreeDataProvider('myCustomContainerView1', treeDataProvider));  
}

export function deactivate() {}