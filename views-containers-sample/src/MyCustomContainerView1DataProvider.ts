'use strict';

import * as vscode from 'vscode';

export class MyCustomContainerView1DataProvider implements vscode.TreeDataProvider<string> {  
    onDidChangeTreeData?: vscode.Event<string | null | undefined> | undefined;  
  
    getTreeItem(element: string): vscode.TreeItem | Thenable<vscode.TreeItem> {  
        return new vscode.TreeItem(element);  
    }  
  
    getChildren(element?: string | undefined): vscode.ProviderResult<string[]> {  
        return ['Node 1', 'Node 2', 'Node 3'];  
    }  
}  