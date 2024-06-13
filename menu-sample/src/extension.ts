'use strict';

import * as vscode from 'vscode';
import {MyCustomViewDataProvider} from './MyCustomViewDataProvider';


export function activate(context: vscode.ExtensionContext) {
	const dataProvider = new MyCustomViewDataProvider();  
    vscode.window.createTreeView('myCustomView', { treeDataProvider: dataProvider });

	const disposable = vscode.commands.registerCommand('extension.sayHello', () => {
		vscode.window.showInformationMessage('Hello World!');
	});
	context.subscriptions.push(disposable);

	const disposable2 = vscode.commands.registerCommand('extension.helloFromEditorTitle', () => {  
        vscode.window.showInformationMessage('Hello from Editor Title!');  
    });
    context.subscriptions.push(disposable2);

	const disposable3 = vscode.commands.registerCommand('extension.helloFromEditorContext', () => {  
        vscode.window.showInformationMessage('Hello from Editor Context!');  
    });  
    context.subscriptions.push(disposable3);

	const disposable4 = vscode.commands.registerCommand('extension.helloFromExplorerContext', (uri: vscode.Uri) => {  
        vscode.window.showInformationMessage('Hello from Explorer Context! The path is: ' + uri.fsPath);  
    });  
    context.subscriptions.push(disposable4);

	const disposable5 = vscode.commands.registerCommand('extension.helloFromViewTitle', () => {  
        vscode.window.showInformationMessage('Hello World from View Title!');  
    });  
    context.subscriptions.push(disposable5);

	const disposable6 = vscode.commands.registerCommand('extension.helloFromViewItemContext', (item) => {  
        vscode.window.showInformationMessage(`Hello World from View Item Title, item is: ${JSON.stringify(item)}`);  
    });  
  
    context.subscriptions.push(disposable6);
}

export function deactivate() {}