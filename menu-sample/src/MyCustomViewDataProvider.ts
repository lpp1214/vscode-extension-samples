'use strict';

import * as vscode from 'vscode';

export class MyCustomViewDataProvider implements vscode.TreeDataProvider<string> {  
    getTreeItem(element: string): vscode.TreeItem {  
        return {  
            label: element,  
            collapsibleState: vscode.TreeItemCollapsibleState.None  
        };  
    }  
  
    getChildren(element?: string): Thenable<string[]> {  
        return Promise.resolve(['Item 1', 'Item 2', 'Item 3']);  
    }  
}  